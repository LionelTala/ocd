import { Injectable, signal } from '@angular/core';

export interface LocalizedText {
  fr: string;
  en: string;
}

export interface Benefit {
  text: LocalizedText;
  /** Prestation liée à Bovann : sous réserve de disponibilité et de validation OCD */
  needsApproval?: boolean;
}

export type PackageIcon = 'crown' | 'rocket' | 'trending' | 'star' | 'gem';

export interface LivePackage {
  id: string;
  name: string;
  icon: PackageIcon;
  durationMinutes: number;
  priceFcfa: number;
  popular?: boolean;
  description: LocalizedText;
  /** Id du package dont celui-ci reprend tout le contenu */
  includes?: string;
  benefits: Benefit[];
}

const b = (fr: string, en: string, needsApproval = false): Benefit => ({
  text: { fr, en },
  needsApproval,
});

// Données simulées (tarifs de démonstration), à remplacer plus tard par l'API Laravel
export const PACKAGES: LivePackage[] = [
  {
    id: 'standard',
    name: 'Standard',
    icon: 'crown',
    durationMinutes: 90,
    priceFcfa: 15000,
    description: { fr: 'Présentation classique de votre business.', en: 'A classic presentation of your business.' },
    benefits: [
      b('Présentation du business et des produits/services.', 'Presentation of your business and products/services.'),
      b("Accompagnement de l'équipe OCD.", 'OCD team support.'),
      b('Interaction avec les spectateurs.', 'Interaction with viewers.'),
      b('Questions-réponses.', 'Q&A.'),
      b('Coordonnées commerciales présentées au public.', 'Your business contact details shown to the audience.'),
    ],
  },
  {
    id: 'business-boost',
    name: 'Business Boost',
    icon: 'rocket',
    durationMinutes: 120,
    priceFcfa: 25000,
    popular: true,
    includes: 'standard',
    description: { fr: "Mise en avant renforcée pour plus d'impact.", en: 'Stronger promotion for more impact.' },
    benefits: [
      b("Préparation d'une mise en scène commerciale avec l'équipe.", 'Preparation of a commercial staging with the team.'),
      b('Démonstration commerciale préparée.', 'Prepared commercial demonstration.'),
      b('Présentation de 3 produits ou services prioritaires.', 'Presentation of 3 priority products or services.'),
      b('Offre promotionnelle spéciale pendant le live.', 'Special promotional offer during the live.'),
    ],
  },
  {
    id: 'sales-boost',
    name: 'Sales Boost',
    icon: 'trending',
    durationMinutes: 150,
    priceFcfa: 35000,
    includes: 'business-boost',
    description: { fr: 'Une animation commerciale dynamique.', en: 'Dynamic sales animation.' },
    benefits: [
      b('Animation commerciale avec jeu-concours.', 'Sales animation with a contest.'),
      b('Séquence dédiée aux objections commerciales.', 'Dedicated sequence on handling sales objections.'),
      b('Code promotionnel exclusif au live.', 'Promo code exclusive to the live.'),
      b("Appel à l'action commercial préparé avec l'équipe.", 'Sales call to action prepared with the team.'),
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: 'star',
    durationMinutes: 120,
    priceFcfa: 50000,
    description: { fr: "Avec la possibilité d'une intervention spéciale.", en: 'With the option of a special guest appearance.' },
    benefits: [
      b('Présentation sur la page officielle de Bovann.', "Presentation on Bovann's official page.", true),
      b("Possibilité d'intervention de Bovann, selon disponibilité.", 'Possible appearance by Bovann, subject to availability.', true),
      b('Présentation approfondie du business.', 'In-depth presentation of your business.'),
      b('Animation commerciale renforcée.', 'Enhanced sales animation.'),
      b("Séquence spéciale avec l'audience.", 'Special sequence with the audience.'),
    ],
  },
  {
    id: 'business-star',
    name: 'Business Star',
    icon: 'gem',
    durationMinutes: 180,
    priceFcfa: 75000,
    includes: 'premium',
    description: { fr: 'Une visibilité étendue avant et après le live.', en: 'Extended visibility before and after the live.' },
    benefits: [
      b('Vidéo teaser promotionnelle avant le live.', 'Promotional teaser video before the live.'),
      b('Publication d\'un extrait vidéo après le live.', 'Video highlight published after the live.'),
      b('Séquence témoignages clients ou démonstration.', 'Customer testimonials or demonstration sequence.'),
      b('Mise en avant de plusieurs produits phares.', 'Spotlight on several flagship products.'),
    ],
  },
  {
    id: 'business-legend',
    name: 'Business Legend',
    icon: 'crown',
    durationMinutes: 240,
    priceFcfa: 120000,
    includes: 'business-star',
    description: { fr: 'Une mise en avant VIP pour votre marque.', en: 'VIP promotion for your brand.' },
    benefits: [
      b("Présentation spéciale de l'entrepreneur et de son parcours.", "Special presentation of the entrepreneur and their journey."),
      b('Intervention privilégiée de Bovann, sous réserve de disponibilité.', 'Priority appearance by Bovann, subject to availability.', true),
      b('Campagne de communication avant le live.', 'Communication campaign before the live.'),
      b('Vidéo promotionnelle dédiée.', 'Dedicated promotional video.'),
      b('Accompagnement VIP personnalisé.', 'Personalized VIP support.'),
      b('Rapport de performance avec les statistiques disponibles.', 'Performance report with the available statistics.'),
    ],
  },
];

/** Point d'accès unique au catalogue : l'admin et l'API Laravel viendront s'y brancher. */
@Injectable({ providedIn: 'root' })
export class PackageCatalog {
  readonly packages = signal<LivePackage[]>(PACKAGES);

  byId(id: string): LivePackage | undefined {
    return this.packages().find((p) => p.id === id);
  }
}