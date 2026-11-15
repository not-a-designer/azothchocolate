import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { setCanonicalUrl } from '../../utils/canonical';

type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

type ContactPayload = {
  name: string;
  email: string;
  venue: string;
  cityRegion: string;
  venueType: string;
  programs: string[];
  timing: string;
  guestCount: string;
  heardAbout: string;
  message: string;
  website: string;
  turnstileToken: string;
};

const PROGRAMS = ['Cacao & Cup', 'Cacao & Craft', 'Cacao & Vine', 'Cacao & Cocoa'];

@Component({
  imports: [ReactiveFormsModule, Header, Footer],
  selector: 'azoth-inquire-page',
  styleUrl: './inquire.scss',
  templateUrl: './inquire.html',
})
export class InquirePage implements AfterViewInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  @ViewChild('turnstileTarget') private turnstileTarget?: ElementRef<HTMLElement>;

  readonly programs = PROGRAMS;
  readonly venueTypes = [
    'Café or coffee roaster',
    'Brewery',
    'Winery',
    'Restaurant or hospitality',
    'Community or cultural organization',
    'Corporate or educational venue',
    'Other',
  ];
  readonly referralSources = ['Referral', 'Social media', 'Search engine', 'Event or tasting', 'Other'];
  readonly timeframes = ['As soon as possible', 'Within 1–3 months', 'Within 3–6 months', 'More than 6 months away', 'Just exploring'];
  readonly guestRanges = ['Under 15', '15–30', '31–50', '51–100', 'More than 100', 'Not sure yet'];

  readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(120)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email, Validators.maxLength(254)] }),
    venue: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(160)] }),
    cityRegion: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(160)] }),
    venueType: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(120)] }),
    programs: new FormControl<string[]>([], { nonNullable: true, validators: [Validators.required] }),
    timing: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(160)] }),
    guestCount: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(80)] }),
    heardAbout: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(120)] }),
    message: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(3000)] }),
    website: new FormControl('', { nonNullable: true }),
  });

  statusMessage = '';
  statusKind: 'success' | 'error' | 'info' = 'info';
  sending = false;
  turnstileReady = false;
  private turnstileToken = '';
  private turnstileWidgetId?: string;
  private readonly turnstileApi = (): TurnstileApi | undefined =>
    (globalThis as typeof globalThis & { turnstile?: TurnstileApi }).turnstile;

  constructor() {
    this.title.setTitle('Plan a Chocolate Tasting | Azoth Chocolate');
    this.meta.updateTag({
      name: 'description',
      content: 'Tell Azoth about your venue, your guests, and the chocolate tasting experience you would like to create.',
    });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    setCanonicalUrl(this.document, 'https://azothchocolate.com/inquire');
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const siteKey = this.document.querySelector<HTMLMetaElement>('meta[name="cf-turnstile-site-key"]')?.content.trim();
    if (!siteKey || siteKey === 'ADD_PUBLIC_TURNSTILE_SITE_KEY') {
      this.statusKind = 'error';
      this.statusMessage = 'The security check is not configured yet. Please email Joel directly.';
      return;
    }

    const render = (): void => this.renderTurnstile(siteKey);
    const existingScript = this.document.querySelector<HTMLScriptElement>('script[data-azoth-turnstile]');
    if (this.turnstileApi()) {
      render();
    } else if (existingScript) {
      existingScript.addEventListener('load', render, { once: true });
    } else {
      const script = this.document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.dataset['azothTurnstile'] = 'true';
      script.addEventListener('load', render, { once: true });
      script.addEventListener('error', () => {
        this.statusKind = 'error';
        this.statusMessage = 'The security check could not load. Please refresh or email Joel directly.';
      }, { once: true });
      this.document.head.append(script);
    }
  }

  ngOnDestroy(): void {
    if (this.turnstileWidgetId) this.turnstileApi()?.remove(this.turnstileWidgetId);
  }

  toggleProgram(program: string, checked: boolean): void {
    const selected = this.form.controls.programs.value;
    this.form.controls.programs.setValue(
      checked ? [...selected, program] : selected.filter((value) => value !== program),
    );
    this.form.controls.programs.markAsTouched();
  }

  isProgramSelected(program: string): boolean {
    return this.form.controls.programs.value.includes(program);
  }

  showError(control: AbstractControl | null): boolean {
    return Boolean(control && control.invalid && (control.touched || this.formSubmitted));
  }

  async submit(): Promise<void> {
    this.formSubmitted = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.statusKind = 'error';
      this.statusMessage = 'Please review the highlighted fields and select at least one experience.';
      return;
    }
    if (!this.turnstileToken) {
      this.statusKind = 'error';
      this.statusMessage = 'Please complete the security check before sending your inquiry.';
      return;
    }

    this.sending = true;
    this.statusKind = 'info';
    this.statusMessage = 'Sending your inquiry…';
    const value = this.form.getRawValue();
    const payload: ContactPayload = { ...value, turnstileToken: this.turnstileToken };
    this.http.post<{ ok: boolean; message: string }>('/api/contact.php', payload).subscribe({
      next: (response) => {
        if (response.ok) {
          this.statusKind = 'success';
          this.statusMessage = 'Thank you—your inquiry has been sent. Joel will follow up by email.';
          this.form.reset({
            name: '', email: '', venue: '', cityRegion: '', venueType: '', programs: [],
            timing: '', guestCount: '', heardAbout: '', message: '', website: '',
          });
          this.formSubmitted = false;
        } else {
          this.statusKind = 'error';
          this.statusMessage = response.message || 'Your inquiry could not be sent. Please try again or email Joel.';
        }
        this.resetTurnstile();
        this.sending = false;
      },
      error: (error: { error?: { message?: string } }) => {
        this.statusKind = 'error';
        this.statusMessage = error.error?.message || 'Your inquiry could not be sent. Please try again or email Joel.';
        this.resetTurnstile();
        this.sending = false;
      },
    });
  }

  private formSubmitted = false;

  private renderTurnstile(siteKey: string): void {
    const api = this.turnstileApi();
    const target = this.turnstileTarget?.nativeElement;
    if (!api || !target || this.turnstileWidgetId) return;
    this.turnstileWidgetId = api.render(target, {
      sitekey: siteKey,
      theme: 'light',
      callback: (token: string) => {
        this.turnstileToken = token;
        this.turnstileReady = true;
        if (this.statusMessage.includes('security check')) this.statusMessage = '';
      },
      'expired-callback': () => {
        this.turnstileToken = '';
        this.turnstileReady = false;
      },
      'error-callback': () => {
        this.turnstileToken = '';
        this.turnstileReady = false;
        this.statusKind = 'error';
        this.statusMessage = 'The security check failed to load. Please refresh and try again.';
      },
    });
  }

  private resetTurnstile(): void {
    this.turnstileToken = '';
    this.turnstileReady = false;
    if (this.turnstileWidgetId) this.turnstileApi()?.reset(this.turnstileWidgetId);
  }
}
