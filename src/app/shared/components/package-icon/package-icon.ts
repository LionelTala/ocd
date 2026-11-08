import { Component, input } from '@angular/core';
import { LucideCrown, LucideGem, LucideRocket, LucideStar, LucideTrendingUp } from '@lucide/angular';
import { PackageIcon } from '../../../core/booking/packages';

@Component({
  selector: 'app-package-icon',
  imports: [LucideCrown, LucideGem, LucideRocket, LucideStar, LucideTrendingUp],
  host: { class: 'inline-flex text-brand-500' },
  template: `
    @switch (icon()) {
      @case ('crown') { <svg lucideCrown class="size-6"></svg> }
      @case ('rocket') { <svg lucideRocket class="size-6"></svg> }
      @case ('trending') { <svg lucideTrendingUp class="size-6"></svg> }
      @case ('star') { <svg lucideStar class="size-6"></svg> }
      @case ('gem') { <svg lucideGem class="size-6"></svg> }
    }
  `,
})
export class PackageIconComponent {
  icon = input.required<PackageIcon>();
}