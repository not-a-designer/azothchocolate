import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App routing', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  async function renderRoute(url: string): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    await TestBed.inject(Router).navigateByUrl(url);
    await fixture.whenStable();
    fixture.detectChanges();

    return fixture.nativeElement as HTMLElement;
  }

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the existing editorial homepage at the root route', async () => {
    const compiled = await renderRoute('/');

    expect(compiled.querySelector('azoth-home-page')).toBeTruthy();
    expect(compiled.querySelector('h1')?.textContent?.replace(/\s+/g, '')).toBe(
      'Chocolate,theuniversalsolvent.',
    );
  });

  it('should direct hosting links to the inquiry section or email', async () => {
    const compiled = await renderRoute('/');
    const links = [...compiled.querySelectorAll<HTMLAnchorElement>('a')];
    const hostingLinks = links.filter((link) =>
      /Host an Experience|Bring Azoth to Your Venue/i.test(link.textContent ?? ''),
    );

    expect(hostingLinks.length).toBeGreaterThan(0);
    expect(hostingLinks.some((link) => link.getAttribute('href') === '/host')).toBe(false);
    expect(hostingLinks.some((link) => link.getAttribute('href') === '#inquire')).toBe(true);
    expect(hostingLinks.some((link) => link.getAttribute('href')?.startsWith('mailto:'))).toBe(
      true,
    );
  });

  it('should keep the event page out of marketing navigation', async () => {
    const compiled = await renderRoute('/');
    const navigationLinks = [
      ...compiled.querySelectorAll<HTMLAnchorElement>('header nav a, footer nav a'),
    ];

    expect(navigationLinks.some((link) => link.getAttribute('href') === '/events')).toBe(false);
  });

  it('should publish canonical and large-image social metadata for the homepage', async () => {
    await renderRoute('/');

    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://azothchocolate.com/',
    );
    expect(document.head.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(
      'https://azothchocolate.com/',
    );
    expect(document.head.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(
      'https://azothchocolate.com/images/azoth-social-share.webp',
    );
    expect(document.head.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe(
      'summary_large_image',
    );
  });

  it('should render the event holding page at /events', async () => {
    const compiled = await renderRoute('/events');

    expect(compiled.querySelector('azoth-events-page')).toBeTruthy();
    expect(compiled.querySelector('#holding-title')?.textContent).toContain('Your tasting details');
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://azothchocolate.com/events',
    );
  });
});
