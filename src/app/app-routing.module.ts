import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ServicePageService } from './firebase-service-page.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'news-overview',
    loadChildren: () => import('./news-overview/news-overview.module').then( m => m.NewsOverviewPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule),
    
  },
  // {
  //   path: '',
  //   redirectTo: 'signup',
  //   pathMatch: 'full'
  // },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    pathMatch:'full'
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers:[ServicePageService]
})
export class AppRoutingModule { }
