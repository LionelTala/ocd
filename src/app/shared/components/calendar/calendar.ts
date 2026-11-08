import { Component, computed, inject, input, output, signal } from '@angular/core';
import { LucideChevronLeft, LucideChevronRight } from '@lucide/angular';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

interface DayCell {
  day: number;
  iso: string;
  disabled: boolean;
}

function toIso(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

@Component({
  selector: 'app-calendar',
  imports: [TranslatePipe, LucideChevronLeft, LucideChevronRight],
  templateUrl: './calendar.html',
})
export class Calendar {
  private i18n = inject(I18nService);

  selected = input<string | null>(null);
  picked = output<string>();

  private today = new Date();
  private viewMonth = signal(new Date(this.today.getFullYear(), this.today.getMonth(), 1));

  private locale = computed(() => (this.i18n.lang() === 'fr' ? 'fr-FR' : 'en-GB'));

  monthLabel = computed(() =>
    new Intl.DateTimeFormat(this.locale(), { month: 'long', year: 'numeric' }).format(this.viewMonth()),
  );

  weekdays = computed(() => {
    const fmt = new Intl.DateTimeFormat(this.locale(), { weekday: 'short' });
    // Le 1er janvier 2024 est un lundi
    return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(2024, 0, 1 + i)));
  });

  cells = computed<(DayCell | null)[]>(() => {
    const m = this.viewMonth();
    const year = m.getFullYear();
    const month = m.getMonth();
    const offset = (new Date(year, month, 1).getDay() + 6) % 7;
    const count = new Date(year, month + 1, 0).getDate();
    const todayIso = toIso(this.today);

    const cells: (DayCell | null)[] = Array(offset).fill(null);
    for (let day = 1; day <= count; day++) {
      const iso = toIso(new Date(year, month, day));
      cells.push({ day, iso, disabled: iso < todayIso });
    }
    return cells;
  });

  canGoPrev = computed(() => {
    const m = this.viewMonth();
    return (
      m.getFullYear() > this.today.getFullYear() ||
      m.getMonth() > this.today.getMonth()
    );
  });

  changeMonth(delta: number): void {
    const m = this.viewMonth();
    this.viewMonth.set(new Date(m.getFullYear(), m.getMonth() + delta, 1));
  }

  pick(cell: DayCell): void {
    if (!cell.disabled) this.picked.emit(cell.iso);
  }
}