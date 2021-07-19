import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './registration/signup/signup.component';
import {CustomPreloadingStrategyService} from "./_shared/services/custom-preloading-strategy.service";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./index/index.module')
      .then(m => m.IndexModule),
  },
  {
    path: 'portfolio0',
    loadChildren: () => import('./portfolio0/portfolio0.module')
      .then(m => m.Portfolio0Module),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module')
      .then(m => m.DashboardModule),
    data: {preload: true}
  },
  {
    path: 'register',
    loadChildren: () => import('./registration/registration.module')
      .then(m => m.RegistrationModule),
    data: {preload: true}
  },
  {
    path: 'templates',
    loadChildren: () => import('./templates/templates.module')
      .then(m => m.TemplatesModule),
    data: {preload: true}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: CustomPreloadingStrategyService})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
