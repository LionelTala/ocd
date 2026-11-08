import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';import {
  LucideArrowLeft,
  LucideArrowRight,
  LucideBriefcase,
  LucideChevronDown,
  LucideCircleAlert,
  LucideMail,
  LucideMapPin,
  LucidePhone,
  LucideStore,
  LucideUser,
} from '@lucide/angular';
import { BookingService } from '../../core/booking/booking.service';
import { LocalizedText, PackageCatalog } from '../../core/booking/packages';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { Stepper } from '../../shared/components/stepper/stepper';

@Component({
  selector: 'app-details',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    TranslatePipe,
    Stepper,
    LucideArrowLeft,
    LucideArrowRight,
    LucideBriefcase,
    LucideChevronDown,
    LucideCircleAlert,
    LucideMail,
    LucideMapPin,
    LucidePhone,
    LucideStore,
    LucideUser,
  ],
  templateUrl: './details.html',
})
export class Details {
  private fb = inject(FormBuilder);
  private catalog = inject(PackageCatalog);
    private router = inject(Router);
  booking = inject(BookingService);
  i18n = inject(I18nService);

  // Données simulées, à remplacer plus tard par l'API Laravel
  activities: { value: string; label: LocalizedText }[] = [
    { value: 'fashion', label: { fr: 'Mode et vêtements', en: 'Fashion and clothing' } },
    { value: 'beauty', label: { fr: 'Beauté et cosmétiques', en: 'Beauty and cosmetics' } },
    { value: 'food', label: { fr: 'Alimentation et boissons', en: 'Food and drinks' } },
    { value: 'electronics', label: { fr: 'Électronique et accessoires', en: 'Electronics and accessories' } },
    { value: 'home', label: { fr: 'Maison et décoration', en: 'Home and decoration' } },
    { value: 'services', label: { fr: 'Services', en: 'Services' } },
    { value: 'other', label: { fr: 'Autre', en: 'Other' } },
  ];

  form = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s]{8,16}$/)]],
    email: ['', [Validators.required, Validators.email]],
    businessName: ['', Validators.required],
    activity: ['', Validators.required],
    city: ['', Validators.required],
    description: [''],
  });

  /** Rappel de la réservation en cours (masqué si l'utilisateur arrive directement ici) */
  summary = computed(() => {
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
    const time = slot.replace('-', ' – ');

    return {
      date,
      slot: fr ? time.replaceAll(':', 'h') : time,
      pack: pack.name,
      price: pack.priceFcfa.toLocaleString(fr ? 'fr-FR' : 'en-GB') + ' FCFA',
    };
  });

  constructor() {
    const saved = this.booking.details();
    if (saved) this.form.patchValue(saved);
  }

  errorKey(name: string): string | null {
    const c = this.form.get(name);
    if (!c || !c.touched || !c.errors) return null;
    if (c.errors['required']) return 'error.required';
    if (c.errors['email']) return 'error.email';
    if (c.errors['pattern']) return 'error.phone';
    return null;
  }

  fieldClass(name: string, extra = ''): string {
    const base =
      'h-11 w-full rounded-lg border bg-white pl-10 text-sm placeholder:text-ink-soft/60 focus:outline-2 focus:outline-offset-0 ';
    const state = this.errorKey(name)
      ? 'border-red-500 focus:outline-red-500'
      : 'border-line focus:outline-brand-500';
    return `${base}${state} ${extra}`;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      document.querySelector<HTMLElement>('input.ng-invalid, select.ng-invalid')?.focus();
      return;
    }
    this.booking.saveDetails(this.form.getRawValue());
    this.router.navigate(['/reserver/confirmation']);  }
}