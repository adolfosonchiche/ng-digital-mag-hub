import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import {MagazineCrudComponent} from "./views/magazines/magazine-crud/magazine-crud.component";

const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent },
    {
      path: 'magazines',
      children: [
        { path: 'create', component: MagazineCrudComponent }
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class DigitalRoutingModule {
}
