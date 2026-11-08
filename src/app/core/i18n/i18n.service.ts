import { Injectable, effect, signal } from '@angular/core';
import { FR } from './fr';
import { EN } from './en';

export type Lang = 'fr' | 'en';

const DICTIONARIES: Record<Lang, Record<string, string>> = { fr: FR, en: EN };
const STORAGE_KEY = 'ocd-live-lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<Lang>(this.initialLang());

  constructor() {
    effect(() => {
      const lang = this.lang();
      document.documentElement.lang = lang;
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {}
    });
  }

  t(key: string): string {
    return DICTIONARIES[this.lang()][key] ?? key;
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
  }

  private initialLang(): Lang {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'fr' || saved === 'en') return saved;
    } catch {}
    return 'fr';
  }
    /** Texte traduit directement dans les données (contenu éditable par l'admin) */
  l(text: { fr: string; en: string }): string {
    return text[this.lang()];
  }
}