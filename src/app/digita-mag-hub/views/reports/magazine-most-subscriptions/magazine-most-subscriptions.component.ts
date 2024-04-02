import {Component, OnInit} from '@angular/core';
import {MagazineDto, MagazineSubscriptionDto} from "../../../../data/models/model";
import {ToasterService} from "../../../../services/other/toaster/toaster.service";
import {MagazineReportService} from "../../../../services/other/magazine/magazine-report.service";
import {ModalComponent} from "../../../../nab-commons/components/modal/modal.component";

@Component({
  selector: 'app-magazine-most-subscriptions',
  templateUrl: './magazine-most-subscriptions.component.html',
  styleUrls: ['./magazine-most-subscriptions.component.scss']
})
export class MagazineMostSubscriptionsComponent implements OnInit {

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
    this.reportService.findByMostSubscriptions(this.fromDate, this.untilDate).subscribe({
      next: (magazines) => {
        this.magazines = magazines ?? [];
      }, error: _ => this.toasterService.showDefaultError()
    });
  }

  openModal(magazine:MagazineDto, modal:ModalComponent){
    this.reportService.findSubscriptions(magazine.magazineId).subscribe({
      next: (subscriptions) => {
        this.subscriptions = subscriptions ?? [];
        modal.open(undefined);
      }, error: _ => this.toasterService.showDefaultError()
    });
  }

}
