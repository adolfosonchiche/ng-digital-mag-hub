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
import {
  MagazineMostSubscriptionsComponent
} from "./views/reports/magazine-most-subscriptions/magazine-most-subscriptions.component";
import { MagazineCommentComponent } from "./views/reports/magazine-comment/magazine-comment.component";
import {AdminProfitsComponent} from "./views/reports/admin-profits/admin-profits.component";
import { MagazineMostLikeComponent } from "./views/reports/magazine-most-like/magazine-most-like.component";
import {EditorProfitsComponent} from "./views/reports/editor-profits/editor-profits.component";
import { MagazineMostCommentComponent } from "./views/reports/magazine-most-comment/magazine-most-comment.component";

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
    },
    {
      path: 'reports',
      children: [
        {
          path: 'magazine',
          children: [
            { path: 'most-subscriptions', component: MagazineMostSubscriptionsComponent },
            { path: 'admin-profits', component: AdminProfitsComponent },
            { path: 'editor-profits', component: EditorProfitsComponent },
            { path: 'comments', component: MagazineCommentComponent },
            { path: 'most-like', component: MagazineMostLikeComponent },
            { path: 'most-comment', component: MagazineMostCommentComponent }
          ]
        }
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class DigitalRoutingModule {
}
