import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideArrowRight, LucideChevronDown, LucideMenu, LucideX } from '@lucide/angular';
import { I18nService, Lang } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    LucideArrowRight,
    LucideChevronDown,
    LucideMenu,
    LucideX,
  ],
  templateUrl: './header.html',
})
export class Header {
  i18n = inject(I18nService);
  menuOpen = signal(false);

  links = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.about', href: '/a-propos' },
    { key: 'nav.offers', href: '/offres' },
    { key: 'nav.faq', href: '/faq' },
    { key: 'nav.contact', href: '/contact' },
  ];

  onLangChange(event: Event): void {
    this.i18n.setLang((event.target as HTMLSelectElement).value as Lang);
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  @HostListener('document:keydown.escape')
  closeMenu(): void {
    this.menuOpen.set(false);
  }
}