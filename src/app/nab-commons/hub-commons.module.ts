import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterComponent } from './components/toaster/toaster.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IconComponent } from './components/icon/icon.component';
import { ActionComponent } from './components/action/action.component';



@NgModule({
  declarations: [
    ToasterComponent,
    NavbarComponent,
    IconComponent,
    ActionComponent,
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    ToasterComponent,
    NavbarComponent,
    IconComponent,
    ActionComponent,
  ]
})
export class HubCommonsModule { }
