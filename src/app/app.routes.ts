import { Routes } from '@angular/router'
import { authGuard } from './core'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () => import('./core/pages/home/home.component').then(m => m.HomeComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./dashboard/components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./core/pages/login/login.component').then(m => m.LoginComponent)
  }
]
