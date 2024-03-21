import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitalRoutingModule } from './digital-routing.module';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { MagazinesCrudComponent } from './views/magazines/magazines-crud/magazines-crud.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    DashboardComponent,
    MagazinesCrudComponent
  ],
  imports: [
    CommonModule,
    DigitalRoutingModule,
    NgSelectModule,
    FormsModule,
  ]
})
export class DigitalMagHubModule { }
