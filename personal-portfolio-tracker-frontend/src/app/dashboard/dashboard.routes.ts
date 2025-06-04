import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./dashboard').then(c => c.Dashboard) },
//   { path: 'asset-allocation', loadChildren: () => import('./dashboard/asset-allocation').then(m => m.asset-allocation) },
//   { path: 'performance-chart', loadChildren: () => import('./dashboard/performance-chart').then(m => m.performance-chart) },
//   { path: 'recent-transactions', loadChildren: () => import('./dashboard/recent-transactions').then(m => m.recent-transactions) },
//   { path: 'holdings-table', loadChildren: () => import('./dashboard/holdings-table').then(m => m.holdings-table) },
];