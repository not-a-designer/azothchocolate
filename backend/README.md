# Azoth contact endpoint

This endpoint is server-side PHP for the Angular site. It is deployed to Namecheap and is not run by `ng serve`.

## Private cPanel configuration

Create `.azoth-contact-config.php` in the cPanel account home directory, one level above the live `public_html` directory. Do not put this file in the repository or inside `public_html`.

```php
<?php
return [
    'smtp_host' => 'the SMTP hostname shown in cPanel Connect Devices',
    'smtp_port' => 465,
    'smtp_encryption' => 'ssl',
    'smtp_username' => 'joel@azothchocolate.com',
    'smtp_password' => 'the mailbox password',
    'recipient' => 'joel@azothchocolate.com',
    'turnstile_secret' => 'the Turnstile secret key',
    'turnstile_hostnames' => ['azothchocolate.com', 'www.azothchocolate.com'],
];
```

Set the file to the most restrictive permissions cPanel allows while still letting PHP read it. The Turnstile site key is public; only its secret belongs in this file.

## Request contract

`POST /api/contact.php` with `Content-Type: application/json`:

```json
{
  "name": "Test contact",
  "email": "visitor@example.com",
  "venue": "Test venue",
  "cityRegion": "Appleton, Wisconsin",
  "venueType": "Cafe",
  "programs": ["Cacao & Cup"],
  "timing": "This fall",
  "guestCount": "About 30",
  "heardAbout": "Referral",
  "message": "What we would like guests to discover",
  "website": "",
  "turnstileToken": "token-from-the-widget"
}
```

The endpoint verifies Turnstile server-side, validates the fields and program names, then sends a plain-text message via authenticated SMTP. The sender is the configured Azoth mailbox; the visitor address is Reply-To. It does not persist submissions.

The Angular inquiry page reads the public Turnstile site key from the `cf-turnstile-site-key` meta tag in `src/index.html`. Set that meta content to the public site key before deployment. Never put the Turnstile secret in the frontend.

## Live smoke test

After deployment and private configuration are in place, visit `/contact-smoke-test.html`, enter the public Turnstile site key and a reply-to address you can access, complete the widget, and send one test. Confirm the email arrives and that Reply sends to the address entered. Remove the smoke-test page from the workflow after the test and before announcing the form.
