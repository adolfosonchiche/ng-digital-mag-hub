import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterComponent } from './components/toaster/toaster.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    ToasterComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    ToasterComponent,
    NavbarComponent,
  ]
})
export class NabCommonsModule { }
