import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideArrowRight, LucideGlobe, LucideMapPin } from '@lucide/angular';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { BookingService, LiveType } from '../../core/booking/booking.service';

@Component({
  selector: 'app-home',
  imports: [TranslatePipe, LucideArrowRight, LucideMapPin, LucideGlobe],
  templateUrl: './home.html',
})
export class Home {
  private booking = inject(BookingService);
  private router = inject(Router);

  choose(type: LiveType): void {
    this.booking.selectType(type);
    this.router.navigate(['/reserver/date']);
  }
}