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
    const hostingLinks = links.filter((link) => link.textContent?.includes('Host an Experience'));

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

  it('should render the event holding page at /events', async () => {
    const compiled = await renderRoute('/events');

    expect(compiled.querySelector('azoth-events-page')).toBeTruthy();
    expect(compiled.querySelector('#holding-title')?.textContent).toContain('Your tasting details');
  });
});
