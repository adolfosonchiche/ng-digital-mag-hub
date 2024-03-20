import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, NgSelectOption } from '@angular/forms';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { NabCommonsModule } from './nab-commons/nab-commons.module';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { RegisterUserComponent } from './view/register-user/register-user.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthInterceptorService } from './services/other/interceptor/auth-interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NabCommonsModule,
    NgSelectModule,
  ],
  exports: [
    NgSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
