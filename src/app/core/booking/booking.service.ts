import { Injectable, signal } from '@angular/core';

export type LiveType = 'onsite' | 'remote';

export interface EntrepreneurDetails {
  fullName: string;
  phone: string;
  email: string;
  businessName: string;
  activity: string;
  city: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  readonly liveType = signal<LiveType | null>(null);
  /** Format AAAA-MM-JJ */
  readonly date = signal<string | null>(null);
  /** Exemple : "11:00-12:30" */
  readonly slot = signal<string | null>(null);
  readonly packageId = signal<string | null>(null);
  readonly details = signal<EntrepreneurDetails | null>(null);

  selectType(type: LiveType): void {
    this.liveType.set(type);
  }

  selectDate(date: string): void {
    this.date.set(date);
    this.slot.set(null);
  }

  selectSlot(slot: string): void {
    this.slot.set(slot);
  }

  selectPackage(id: string): void {
    this.packageId.set(id);
  }

  saveDetails(details: EntrepreneurDetails): void {
    this.details.set(details);
  }
    reset(): void {
    this.liveType.set(null);
    this.date.set(null);
    this.slot.set(null);
    this.packageId.set(null);
    this.details.set(null);
  }
}