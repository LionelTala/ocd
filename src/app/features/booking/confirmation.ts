import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideArrowRight, LucideCalendarDays, LucideCheck, LucideHeart, LucideStar } from '@lucide/angular';import { BookingService } from '../../core/booking/booking.service';
import { PackageCatalog } from '../../core/booking/packages';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { Stepper } from '../../shared/components/stepper/stepper';

@Component({
  selector: 'app-confirmation',
  imports: [TranslatePipe, LucideArrowRight, LucideCalendarDays, LucideCheck, LucideHeart, LucideStar],
    templateUrl: './confirmation.html',
})
export class Confirmation {
  private booking = inject(BookingService);
  private catalog = inject(PackageCatalog);
  private router = inject(Router);
  private i18n = inject(I18nService);
    confetti = [
    { x: '6%', y: '45%', r: 35, w: 10 },
    { x: '14%', y: '18%', r: -50, w: 8 },
    { x: '22%', y: '72%', r: 70, w: 12 },
    { x: '30%', y: '8%', r: 20, w: 8 },
    { x: '58%', y: '4%', r: -30, w: 10 },
    { x: '80%', y: '14%', r: 60, w: 9 },
    { x: '90%', y: '46%', r: -20, w: 12 },
    { x: '93%', y: '76%', r: 45, w: 8 },
    { x: '72%', y: '84%', r: -60, w: 10 },
    { x: '12%', y: '86%', r: 15, w: 8 },
  ];

  constructor() {
    // Accès direct sans réservation : retour à l'accueil
    if (!this.booking.details()) this.router.navigate(['/']);
  }

  recap = computed(() => {
    const iso = this.booking.date();
    const slot = this.booking.slot();
    const pack = this.catalog.byId(this.booking.packageId() ?? '');
    if (!iso || !slot || !pack) return null;

    const fr = this.i18n.lang() === 'fr';
    const [y, m, d] = iso.split('-').map(Number);
    const date = new Intl.DateTimeFormat(fr ? 'fr-FR' : 'en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(y, m - 1, d));
    const [start, end] = slot.split('-');
    const time = fr ? `de ${start.replace(':', 'h')} à ${end.replace(':', 'h')}` : `${start} – ${end}`;

    return {
      date,
      time,
      pack: pack.name,
      price: pack.priceFcfa.toLocaleString(fr ? 'fr-FR' : 'en-GB') + ' FCFA',
      needsApproval: pack.benefits.some((b) => b.needsApproval),
    };
  });

  backHome(): void {
    this.booking.reset();
    this.router.navigate(['/']);
  }
}