import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import {MagazineCrudComponent} from "./views/magazines/magazine-crud/magazine-crud.component";
import {MagazineListComponent} from "./views/magazines/magazine-list/magazine-list.component";
import {MagazineCostComponent} from "./views/magazines/magazine-cost/magazine-cost.component";
import {MagazineSearchComponent} from "./views/magazines/magazine-search/magazine-search.component";
import {MagazineSubscriptionComponent} from "./views/magazines/magazine-subscription/magazine-subscription.component";
import {MagazineViewComponent} from "./views/magazines/magazine-view/magazine-view.component";
import {UserCrudComponent} from "./views/users/user-crud/user-crud.component";

const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent },
    {
      path: 'magazines',
      children: [
        { path: '', component: MagazineListComponent },
        { path: 'create', component: MagazineCrudComponent },
        { path: 'cost', component: MagazineCostComponent },
        { path: 'search', component: MagazineSearchComponent },
        { path: 'subscription/:magazineId', component: MagazineSubscriptionComponent },
        { path: 'subscription/:magazineId/view', component: MagazineViewComponent },
      ]
    },
    {
      path: 'users',
      children: [
        { path: 'me', component: UserCrudComponent }
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class DigitalRoutingModule {
}
