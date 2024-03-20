import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import {MagazinesCrudComponent} from "./views/magazines/magazines-crud/magazines-crud.component";

const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent },
    {
      path: 'magazines',
      children: [
        { path: 'create', component: MagazinesCrudComponent }
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class DigitalRoutingModule {
}
