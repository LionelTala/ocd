import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-footer',
  imports: [
    TranslatePipe, 
    RouterLink
  ],
  templateUrl: './footer.html',
})
export class Footer {
  year = new Date().getFullYear();

  socials = [
    { name: 'TikTok', href: '#' },
    { name: 'YouTube', href: '#' },
    { name: 'Facebook', href: '#' },
    { name: 'X', href: '#' },
  ];
}