import { Routes } from '@angular/router';
import { Signup } from './auth/signup/signup';
import { Auth } from './auth/auth';
import { Login } from './auth/login/login';
import { Dashboard } from './dashboard/dashboard';
import { Setting } from './setting/setting';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', loadComponent: () => import('./auth/signup/signup').then(c => c.Signup) },
  { path: 'login', loadComponent:() => import('./auth/login/login').then(c => c.Login) },
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard').then(m => Dashboard), canActivate: [Auth] },
  { path: 'settings', component: Setting, canActivate: [Auth], },
];