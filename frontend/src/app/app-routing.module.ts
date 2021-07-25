import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './registration/signup/signup.component';
import {CustomPreloadingStrategyService} from "./_shared/services/custom-preloading-strategy.service";
import {environment} from "../environments/environment";

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
  }
];

const templateRoutes: Routes = [
  {
    path: '',
    loadChildren: () => {
      return import('./portfolio1/portfolio1.module')
            .then(m => m.Portfolio1Module);
    }
  }
];


const isCurrentDomainWebipie = (window.location.hostname === environment.websiteDomainName || window.location.hostname === `www.${environment.websiteDomainName}` || window.location.hostname == "localhost");

@NgModule({
  imports: [RouterModule.forRoot(isCurrentDomainWebipie? routes: templateRoutes, {preloadingStrategy: CustomPreloadingStrategyService})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
