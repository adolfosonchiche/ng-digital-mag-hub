import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { RegisterUserComponent } from './view/register-user/register-user.component';
import { AllowNavigationSys } from './security/allow-navigation-sys';
import { AllowNavigationInDigitalMagHub } from './security/allow-navigation-in-digital-mag-hub';

const routes: Routes = [
  { path:'', component: HomeComponent, canActivate:[AllowNavigationSys] },
  { path:'login', component: LoginComponent, canActivate:[AllowNavigationSys] },
  { path:'register', component: RegisterUserComponent, canActivate:[AllowNavigationSys] },
  {path: 'digital', loadChildren: () => import('./digita-mag-hub/digital-mag-hub.module').then(m => m.DigitalMagHubModule), canActivate:[AllowNavigationInDigitalMagHub]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
