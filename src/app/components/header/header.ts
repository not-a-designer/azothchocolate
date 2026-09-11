import { DOCUMENT } from '@angular/common';
import { Component, HostListener, inject, OnDestroy, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'azoth-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header implements OnDestroy {
  private readonly document = inject(DOCUMENT);

  readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.setMenuState(!this.menuOpen());
  }

  closeMenu(): void {
    this.setMenuState(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('menu-open');
  }

  private setMenuState(open: boolean): void {
    this.menuOpen.set(open);
    this.document.body.classList.toggle('menu-open', open);
  }
}
