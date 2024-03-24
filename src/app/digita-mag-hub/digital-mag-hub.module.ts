import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitalRoutingModule } from './digital-routing.module';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { MagazineCrudComponent } from './views/magazines/magazine-crud/magazine-crud.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import { MagazineListComponent } from './views/magazines/magazine-list/magazine-list.component';
import { MagazineCostComponent } from './views/magazines/magazine-cost/magazine-cost.component';
import {HubCommonsModule} from "../nab-commons/hub-commons.module";



@NgModule({
  declarations: [
    DashboardComponent,
    MagazineCrudComponent,
    MagazineListComponent,
    MagazineCostComponent
  ],
  imports: [
    CommonModule,
    DigitalRoutingModule,
    NgSelectModule,
    FormsModule,
    HubCommonsModule,
  ]
})
export class DigitalMagHubModule { }
