import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the editorial title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent?.replace(/\s+/g, '')).toBe(
      'Chocolate,theuniversalsolvent.',
    );
  });

  it('should direct hosting links to the inquiry section or email', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const links = [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('a'),
    ];
    const hostingLinks = links.filter((link) => link.textContent?.includes('Host an Experience'));

    expect(hostingLinks.length).toBeGreaterThan(0);
    expect(hostingLinks.some((link) => link.getAttribute('href') === '/host')).toBe(false);
    expect(hostingLinks.some((link) => link.getAttribute('href') === '#inquire')).toBe(true);
    expect(hostingLinks.some((link) => link.getAttribute('href')?.startsWith('mailto:'))).toBe(
      true,
    );
  });
});
