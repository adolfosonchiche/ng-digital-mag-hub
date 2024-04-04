import {Component, OnInit} from '@angular/core';
import {MagazineReportService} from "../../../../services/other/magazine/magazine-report.service";
import {ToasterService} from "../../../../services/other/toaster/toaster.service";
import {MagazineDto, MagazineSubscriptionDto} from "../../../../data/models/model";
import {ModalComponent} from "../../../../nab-commons/components/modal/modal.component";

@Component({
  selector: 'app-subscriptions-to-my-magazines',
  templateUrl: './subscriptions-to-my-magazines.component.html',
  styleUrls: ['./subscriptions-to-my-magazines.component.scss']
})
export class SubscriptionsToMyMagazinesComponent implements OnInit {

  magazines:MagazineDto[] = [];
  subscriptions:MagazineSubscriptionDto[] = [];
  fromDate:string;
  untilDate:string;

  constructor(
    private reportService:MagazineReportService,
    private toasterService:ToasterService,
  ) {
  }

  ngOnInit(): void {
    this.initDates();
    this.findAll();
  }

  initDates(){
    let currentDate = new Date();
    this.untilDate = currentDate.toISOString().substring(0, 10);
    let lastDate = new Date();
    lastDate.setMonth(currentDate.getMonth() - 1);
    this.fromDate = lastDate.toISOString().substring(0, 10);
  }

  findAll(){
    this.reportService.findMineWithSubscriptions(this.fromDate, this.untilDate).subscribe({
      next: (magazines) => {
        this.magazines = magazines ?? [];
      }, error: _ => this.toasterService.showDefaultError()
    });
  }

  openModal(magazine:MagazineDto, modal:ModalComponent){
    this.reportService.findSubscriptions(magazine.magazineId, this.fromDate, this.untilDate).subscribe({
      next: (subscriptions) => {
        this.subscriptions = subscriptions ?? [];
        modal.open(undefined);
      }, error: _ => this.toasterService.showDefaultError()
    });
  }

}
