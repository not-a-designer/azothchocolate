<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'message' => 'Use POST to submit an inquiry.']);
}

$contentType = strtolower(trim(explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0]));
if ($contentType !== 'application/json') {
    respond(415, ['ok' => false, 'message' => 'The request must use JSON.']);
}

$requestBody = file_get_contents('php://input');
if ($requestBody === false || strlen($requestBody) > 20000) {
    respond(413, ['ok' => false, 'message' => 'The request is too large.']);
}

$request = json_decode($requestBody, true);
if (!is_array($request)) {
    respond(400, ['ok' => false, 'message' => 'The request could not be read.']);
}

// Honeypot: quietly accept bot submissions without sending email.
if (trim((string)($request['website'] ?? '')) !== '') {
    respond(200, ['ok' => true, 'message' => 'Thank you. Your inquiry has been sent.']);
}

$configPath = dirname(__DIR__, 2) . '/.azoth-contact-config.php';
if (!is_file($configPath) || !is_readable($configPath)) {
    error_log('Azoth contact endpoint is missing its private configuration file.');
    respond(503, ['ok' => false, 'message' => 'The inquiry service is not configured yet. Please email Joel directly.']);
}

$config = require $configPath;
if (!is_array($config)) {
    error_log('Azoth contact endpoint configuration did not return an array.');
    respond(503, ['ok' => false, 'message' => 'The inquiry service is temporarily unavailable. Please email Joel directly.']);
}

$requiredConfig = ['smtp_host', 'smtp_port', 'smtp_encryption', 'smtp_username', 'smtp_password', 'recipient', 'turnstile_secret', 'turnstile_hostnames'];
foreach ($requiredConfig as $key) {
    if (!array_key_exists($key, $config) || $config[$key] === '') {
        error_log('Azoth contact endpoint configuration is missing a required setting.');
        respond(503, ['ok' => false, 'message' => 'The inquiry service is temporarily unavailable. Please email Joel directly.']);
    }
}

$cleanText = static function (mixed $value, int $maxLength): string {
    if (!is_string($value)) {
        return '';
    }

    $value = trim(str_replace("\0", '', $value));
    if (strlen($value) > $maxLength) {
        return '';
    }

    return $value;
};

$name = $cleanText($request['name'] ?? null, 120);
$email = $cleanText($request['email'] ?? null, 254);
$venue = $cleanText($request['venue'] ?? null, 160);
$venueType = $cleanText($request['venueType'] ?? null, 120);
$timing = $cleanText($request['timing'] ?? null, 160);
$guestCount = $cleanText($request['guestCount'] ?? null, 80);
$heardAbout = $cleanText($request['heardAbout'] ?? null, 120);
$message = $cleanText($request['message'] ?? null, 3000);
$turnstileToken = $cleanText($request['turnstileToken'] ?? null, 2048);
$programs = $request['programs'] ?? [];
$allowedPrograms = ['Cacao & Cup', 'Cacao & Craft', 'Cacao & Vine', 'Cacao & Cocoa'];

if ($name === '' || $venue === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $turnstileToken === '') {
    respond(422, ['ok' => false, 'message' => 'Please complete the required fields and security check.']);
}

if (!is_array($programs) || count($programs) > count($allowedPrograms)) {
    respond(422, ['ok' => false, 'message' => 'Please select valid experience interests.']);
}

$selectedPrograms = [];
foreach ($programs as $program) {
    if (!is_string($program) || !in_array($program, $allowedPrograms, true)) {
        respond(422, ['ok' => false, 'message' => 'Please select valid experience interests.']);
    }
    $selectedPrograms[] = $program;
}

$selectedPrograms = array_values(array_unique($selectedPrograms));
if ($selectedPrograms === []) {
    respond(422, ['ok' => false, 'message' => 'Please select at least one experience.']);
}

$turnstileCurl = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
if ($turnstileCurl === false) {
    error_log('Azoth contact endpoint could not initialize cURL for Turnstile verification.');
    respond(503, ['ok' => false, 'message' => 'The security check is temporarily unavailable. Please try again.']);
}

$verificationFields = [
    'secret' => (string)$config['turnstile_secret'],
    'response' => $turnstileToken,
];
$clientIp = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? '';
if (filter_var($clientIp, FILTER_VALIDATE_IP)) {
    $verificationFields['remoteip'] = $clientIp;
}

curl_setopt_array($turnstileCurl, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query($verificationFields),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 4,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
]);

$verificationBody = curl_exec($turnstileCurl);
$verificationStatus = (int)curl_getinfo($turnstileCurl, CURLINFO_RESPONSE_CODE);
$verificationError = curl_error($turnstileCurl);
curl_close($turnstileCurl);

$verification = is_string($verificationBody) ? json_decode($verificationBody, true) : null;
if ($verificationStatus !== 200 || !is_array($verification) || empty($verification['success'])) {
    if ($verificationError !== '') {
        error_log('Azoth Turnstile verification request failed.');
    }
    respond(422, ['ok' => false, 'message' => 'The security check expired or could not be verified. Please try it again.']);
}

$validHostnames = array_map('strtolower', (array)$config['turnstile_hostnames']);
$verifiedHostname = strtolower((string)($verification['hostname'] ?? ''));
if (!in_array($verifiedHostname, $validHostnames, true)) {
    error_log('Azoth Turnstile verification returned an unexpected hostname.');
    respond(422, ['ok' => false, 'message' => 'The security check could not be verified for this site.']);
}

require dirname(__DIR__) . '/vendor/autoload.php';

$subjectVenue = preg_replace('/[\r\n]+/', ' ', $venue) ?? $venue;
$programText = implode(', ', $selectedPrograms);
$body = implode("\n", [
    'New inquiry from the Azoth Chocolate website',
    '',
    'Name: ' . $name,
    'Email: ' . $email,
    'Venue: ' . $venue,
    'Venue type: ' . ($venueType !== '' ? $venueType : 'Not provided'),
    'Experience interests: ' . $programText,
    'Timing: ' . ($timing !== '' ? $timing : 'Not provided'),
    'Estimated guest count: ' . ($guestCount !== '' ? $guestCount : 'Not provided'),
    'How they heard about Azoth: ' . ($heardAbout !== '' ? $heardAbout : 'Not provided'),
    '',
    'What they would like guests to discover:',
    $message !== '' ? $message : 'Not provided',
]);

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = (string)$config['smtp_host'];
    $mail->SMTPAuth = true;
    $mail->Username = (string)$config['smtp_username'];
    $mail->Password = (string)$config['smtp_password'];
    $mail->Port = (int)$config['smtp_port'];
    $mail->Timeout = 15;
    $mail->SMTPDebug = SMTP::DEBUG_OFF;

    $encryption = strtolower((string)$config['smtp_encryption']);
    if ($encryption === 'ssl') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } elseif ($encryption === 'tls') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    } else {
        error_log('Azoth contact endpoint has an unsupported SMTP encryption setting.');
        respond(503, ['ok' => false, 'message' => 'The inquiry service is temporarily unavailable. Please email Joel directly.']);
    }

    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->setFrom((string)$config['smtp_username'], 'Azoth Chocolate website');
    $mail->addAddress((string)$config['recipient']);
    $mail->addReplyTo($email, $name);
    $mail->Subject = 'New Azoth tasting inquiry: ' . $subjectVenue;
    $mail->Body = $body;
    $mail->send();
} catch (Throwable $error) {
    error_log('Azoth inquiry email could not be sent: ' . $error->getMessage());
    respond(502, ['ok' => false, 'message' => 'Your inquiry could not be sent just now. Please email Joel directly.']);
}

respond(200, ['ok' => true, 'message' => 'Thank you. Your inquiry has been sent.']);
