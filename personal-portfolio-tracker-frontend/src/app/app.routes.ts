import { Routes } from '@angular/router';
import { Signup } from './auth/signup/signup';
import { Auth } from './auth/auth';
import { Login } from './auth/login/login';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [Auth] }
];