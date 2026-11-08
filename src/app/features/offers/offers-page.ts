import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight, LucideCheck } from '@lucide/angular';
import { PackageCatalog } from '../../core/booking/packages';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { PackageIconComponent } from '../../shared/components/package-icon/package-icon';

@Component({
  selector: 'app-offers-page',
  imports: [RouterLink, TranslatePipe, PackageIconComponent, LucideArrowRight, LucideCheck],
  templateUrl: './offers-page.html',
})
export class OffersPage {
  i18n = inject(I18nService);
  private catalog = inject(PackageCatalog);

  packages = this.catalog.packages;

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