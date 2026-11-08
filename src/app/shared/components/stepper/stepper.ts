import { Component, input } from '@angular/core';
import { LucideCheck } from '@lucide/angular';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-stepper',
  imports: [TranslatePipe, LucideCheck],
  templateUrl: './stepper.html',
})
export class Stepper {
  /** Étape en cours, de 1 à 5 */
  current = input.required<number>();

  steps = ['step.type', 'step.date', 'step.offer', 'step.info', 'step.confirm'];
}