import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { NabCommonsModule } from './nab-commons/nab-commons.module';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NabCommonsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
