import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  LucideArrowRight,
  LucideCheck,
  LucideCircleAlert,
  LucideMail,
  LucideMapPin,
  LucidePhone,
} from '@lucide/angular';
import { CONTACT } from '../../core/contact';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-contact',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    LucideArrowRight,
    LucideCheck,
    LucideCircleAlert,
    LucideMail,
    LucideMapPin,
    LucidePhone,
  ],
  templateUrl: './contact.html',
})
export class Contact {
  private fb = inject(FormBuilder);

  info = CONTACT;
  whatsapp = `https://wa.me/${CONTACT.phone.replace('+', '')}`;
  sent = signal(false);

  form = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  errorKey(name: string): string | null {
    const c = this.form.get(name);
    if (!c || !c.touched || !c.errors) return null;
    return c.errors['email'] ? 'error.email' : 'error.required';
  }

  fieldClass(name: string): string {
    const state = this.errorKey(name)
      ? 'border-red-500 focus:outline-red-500'
      : 'border-line focus:outline-brand-500';
    return `w-full rounded-lg border bg-white px-3 text-sm placeholder:text-ink-soft/60 focus:outline-2 ${state}`;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      document.querySelector<HTMLElement>('.ng-invalid[formControlName]')?.focus();
      return;
    }
    // Envoi simulé : sera branché sur l'API Laravel plus tard
    this.sent.set(true);
  }

  again(): void {
    this.form.reset();
    this.sent.set(false);
  }
}