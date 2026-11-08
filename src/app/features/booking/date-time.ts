import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';import { LucideArrowLeft, LucideArrowRight } from '@lucide/angular';
import { BookingService } from '../../core/booking/booking.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { Calendar } from '../../shared/components/calendar/calendar';
import { Stepper } from '../../shared/components/stepper/stepper';

@Component({
  selector: 'app-date-time',
  imports: [RouterLink, TranslatePipe, Calendar, Stepper, LucideArrowLeft, LucideArrowRight],
  templateUrl: './date-time.html',
})
export class DateTime {
  booking = inject(BookingService);
  private i18n = inject(I18nService);
    private router = inject(Router);

  next(): void {
    this.router.navigate(['/reserver/offres']);
  }

  // Données simulées, à remplacer plus tard par l'API Laravel
  slots = ['09:00-10:30', '11:00-12:30', '14:00-15:30', '16:00-17:30'];

  dateLabel = computed(() => {
    const iso = this.booking.date();
    if (!iso) return null;
    const [y, m, d] = iso.split('-').map(Number);
    const locale = this.i18n.lang() === 'fr' ? 'fr-FR' : 'en-GB';
    return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(
      new Date(y, m - 1, d),
    );
  });

  slotLabel(slot: string): string {
    const text = slot.replace('-', ' – ');
    return this.i18n.lang() === 'fr' ? text.replaceAll(':', 'h') : text;
  }
}