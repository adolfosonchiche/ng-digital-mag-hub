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
import {NgbDropdownItem} from "@ng-bootstrap/ng-bootstrap";
import { MagazineSearchComponent } from './views/magazines/magazine-search/magazine-search.component';
import { MagazineSubscriptionComponent } from './views/magazines/magazine-subscription/magazine-subscription.component';
import { MagazineViewComponent } from './views/magazines/magazine-view/magazine-view.component';



@NgModule({
  declarations: [
    DashboardComponent,
    MagazineCrudComponent,
    MagazineListComponent,
    MagazineCostComponent,
    MagazineSearchComponent,
    MagazineSubscriptionComponent,
    MagazineViewComponent
  ],
  imports: [
    CommonModule,
    DigitalRoutingModule,
    NgSelectModule,
    FormsModule,
    HubCommonsModule,
    NgbDropdownItem,
  ]
})
export class DigitalMagHubModule { }
