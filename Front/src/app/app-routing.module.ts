import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },

  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'family-main',
    loadChildren: () => import('./family-main/family-main.module').then( m => m.FamilyMainPageModule)
  },
  {
    path: 'lista-compra',
    loadChildren: () => import('./lista-compra/lista-compra.module').then( m => m.ListaCompraPageModule)
  },
  {
    path: 'create-product',
    loadChildren: () => import('./create-product/create-product.module').then( m => m.CreateProductPageModule)
  },
  {
    path: 'list-market-modal',
    loadChildren: () => import('./list-market-modal/list-market-modal.module').then( m => m.ListMarketModalPageModule)
  },
  {
    path: 'ver-lista',
    loadChildren: () => import('./ver-lista/ver-lista.module').then( m => m.VerListaPageModule)
  },




/*
  {
    path: 'family',
    loadChildren: () => import('./family/friends.module').then( m => m.FriendsPageModule)
  },
  {
    path: 'family-list',
    loadChildren: () => import('./family-list/family-list.module').then( m => m.FriendListPageModule)
  },
  */




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
