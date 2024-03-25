import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import {MagazineCrudComponent} from "./views/magazines/magazine-crud/magazine-crud.component";
import {MagazineListComponent} from "./views/magazines/magazine-list/magazine-list.component";
import {MagazineCostComponent} from "./views/magazines/magazine-cost/magazine-cost.component";
import {MagazineSearchComponent} from "./views/magazines/magazine-search/magazine-search.component";

const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent },
    {
      path: 'magazines',
      children: [
        { path: '', component: MagazineListComponent },
        { path: 'create', component: MagazineCrudComponent },
        { path: 'cost', component: MagazineCostComponent },
        { path: 'search', component: MagazineSearchComponent },
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class DigitalRoutingModule {
}
