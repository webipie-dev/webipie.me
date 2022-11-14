import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomPreloadingStrategyService} from "./_shared/services/custom-preloading-strategy.service";
import {environment} from "../environments/environment";
import {LoginAuthGuardService as LoginAuthGuard} from "./_shared/services/login-auth-guard.service";
import { AuthGuardService } from './_shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./index/index.module')
      .then(m => m.IndexModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module')
      .then(m => m.DashboardModule),
    canActivate: [AuthGuardService],
    data: {preload: true, expectedRole: 'user'}
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
  },
  {
    path: 'portfolio1',
    loadChildren: () => {
      return import('./portfolio1/portfolio1.module')
            .then(m => m.Portfolio1Module);
    }
  }
];

const templateRoutes: Routes = [
  {
    path: '',
    loadChildren: () => {
      const template = JSON.parse(localStorage.getItem('portfolio')!).template.name;
      if (template === 'template1')
      return import('./portfolio1/portfolio1.module')
              .then(m => m.Portfolio1Module);
      else 
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
