import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SessionRequiredGuard } from './guards/session-required.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( modulo => modulo.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( modulo => modulo.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( modulo => modulo.HomePageModule),
    canActivate: [SessionRequiredGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then( modulo => modulo.ProductsPageModule),
    canActivate: [SessionRequiredGuard]
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( modulo => modulo.CartPageModule),
    canActivate: [SessionRequiredGuard]
  },
  {
    path: 'posts',
    loadChildren: () => import('./pages/posts/posts.module').then( modulo => modulo.PostsPageModule),
    canActivate: [SessionRequiredGuard]
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./pages/profile/profile.module').then( modulo => modulo.ProfilePageModule),
    canActivate: [SessionRequiredGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
