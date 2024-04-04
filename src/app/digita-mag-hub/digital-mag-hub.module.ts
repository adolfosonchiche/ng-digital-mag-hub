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
import { UserCrudComponent } from './views/users/user-crud/user-crud.component';
import { MagazinePreviewComponent } from './views/magazines/magazine-preview/magazine-preview.component';
import { ModalMagazinePreviewComponent } from './modals/modal-magazine-preview/modal-magazine-preview.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ModalMagazineCommentComponent } from './modals/modal-magazine-comment/modal-magazine-comment.component';
import { MagazineMostSubscriptionsComponent } from './views/reports/magazine-most-subscriptions/magazine-most-subscriptions.component';
import { ModalViewEditorProfileComponent } from './modals/modal-view-editor-profile/modal-view-editor-profile.component';
import { CommentFromAMagazineComponent } from './components/comment-from-a-magazine/comment-from-a-magazine.component';
import { MagazineCommentComponent } from './views/reports/magazine-comment/magazine-comment.component';
import { AdminProfitsComponent } from './views/reports/admin-profits/admin-profits.component';




@NgModule({
  declarations: [
    DashboardComponent,
    MagazineCrudComponent,
    MagazineListComponent,
    MagazineCostComponent,
    MagazineSearchComponent,
    MagazineSubscriptionComponent,
    MagazineViewComponent,
    UserCrudComponent,
    ModalMagazinePreviewComponent,
    MagazinePreviewComponent,
    ModalMagazineCommentComponent,
    MagazineMostSubscriptionsComponent,
    ModalViewEditorProfileComponent,
    CommentFromAMagazineComponent,
    MagazineCommentComponent,
    AdminProfitsComponent
  ],
  imports: [
    CommonModule,
    DigitalRoutingModule,
    NgSelectModule,
    FormsModule,
    HubCommonsModule,
    NgbDropdownItem,
    NgxExtendedPdfViewerModule
  ]
})
export class DigitalMagHubModule { }
