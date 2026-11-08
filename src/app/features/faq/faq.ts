import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight, LucideChevronDown } from '@lucide/angular';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-faq',
  imports: [RouterLink, TranslatePipe, LucideArrowRight, LucideChevronDown],
  templateUrl: './faq.html',
})
export class Faq {
  items = [1, 2, 3, 4, 5, 6, 7];
}