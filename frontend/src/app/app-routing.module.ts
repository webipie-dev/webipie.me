import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomPreloadingStrategyService} from "./_shared/services/custom-preloading-strategy.service";
import {environment} from "../environments/environment";
import {AuthGuardService as AuthGuard} from './_shared/services/auth-guard.service';
import {LoginAuthGuardService as LoginAuthGuard} from "./_shared/services/login-auth-guard.service";

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
    //canActivate: [AuthGuard],
    data: {preload: true, expectedRole: 'user'}
  },
  {
    path: 'register',
    loadChildren: () => import('./registration/registration.module')
      .then(m => m.RegistrationModule),
    canActivate: [LoginAuthGuard],
    data: {preload: true}
  },
  {
    path: 'templates',
    loadChildren: () => import('./templates/templates.module')
      .then(m => m.TemplatesModule),
    data: {preload: true}
  }
];

const templateRoutes: Routes = [
  {
    path: '',
    loadChildren: () => {
      return import('./portfolio0/portfolio0.module')
            .then(m => m.Portfolio0Module);
    }
  }
];

const isCurrentDomainWebipie = (window.location.hostname === environment.websiteDomainName || window.location.hostname === `www.${environment.websiteDomainName}` || window.location.hostname === 'localhost');


@NgModule({
  imports: [RouterModule.forRoot(isCurrentDomainWebipie? routes: templateRoutes, {preloadingStrategy: CustomPreloadingStrategyService})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
