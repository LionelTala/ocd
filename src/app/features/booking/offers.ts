import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  LucideArrowLeft,
  LucideArrowRight,
  LucideCheck,
  LucideCrown,
  LucideGem,
  LucideRocket,
  LucideStar,
  LucideTrendingUp,
} from '@lucide/angular';
import { BookingService } from '../../core/booking/booking.service';
import { PackageCatalog } from '../../core/booking/packages';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { Stepper } from '../../shared/components/stepper/stepper';

@Component({
  selector: 'app-offers',
  imports: [
    RouterLink,
    TranslatePipe,
    Stepper,
    LucideArrowLeft,
    LucideArrowRight,
    LucideCheck,
    LucideCrown,
    LucideGem,
    LucideRocket,
    LucideStar,
    LucideTrendingUp,
  ],
  templateUrl: './offers.html',
})
export class Offers {
  booking = inject(BookingService);
  i18n = inject(I18nService);
  private catalog = inject(PackageCatalog);

  packages = this.catalog.packages;
    private router = inject(Router);

  next(): void {
    this.router.navigate(['/reserver/informations']);
  }

  nameOf(id: string): string {
    return this.catalog.byId(id)?.name ?? '';
  }

  duration(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`;
  }

  price(value: number): string {
    return value.toLocaleString(this.i18n.lang() === 'fr' ? 'fr-FR' : 'en-GB');
  }
}