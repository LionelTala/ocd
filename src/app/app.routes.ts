import { Routes } from '@angular/router';
import { Home } from './features/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'reserver/date',
    loadComponent: () => import('./features/booking/date-time').then((m) => m.DateTime),
  },
    {
    path: 'reserver/offres',
    loadComponent: () => import('./features/booking/offers').then((m) => m.Offers),
  },
    {
    path: 'reserver/informations',
    loadComponent: () => import('./features/booking/details').then((m) => m.Details),
  },
    {
    path: 'reserver/confirmation',
    loadComponent: () => import('./features/booking/confirmation').then((m) => m.Confirmation),
  },
    {
    path: 'offres',
    loadComponent: () => import('./features/offers/offers-page').then((m) => m.OffersPage),
  },
    {
    path: 'a-propos',
    loadComponent: () => import('./features/about/about').then((m) => m.About),
  },
    {
    path: 'faq',
    loadComponent: () => import('./features/faq/faq').then((m) => m.Faq),
  },
    {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
  },
  { path: '**', redirectTo: '' },
];