import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight, LucideGlobe, LucideMapPin } from '@lucide/angular';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-about',
  imports: [RouterLink, TranslatePipe, LucideArrowRight, LucideGlobe, LucideMapPin],
  templateUrl: './about.html',
})
export class About {
  steps = ['about.how1', 'about.how2', 'about.how3', 'about.how4'];
}