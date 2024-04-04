import {Component, OnInit} from '@angular/core';
import {MagazineReportService} from "../../../../services/other/magazine/magazine-report.service";
import {ToasterService} from "../../../../services/other/toaster/toaster.service";
import {GlobalProfitDto, MagazineDto, MagazineProfitDto, SubscriptionProfitDto} from "../../../../data/models/model";
import {ModalComponent} from "../../../../nab-commons/components/modal/modal.component";

@Component({
  selector: 'app-admin-profits',
  templateUrl: './admin-profits.component.html',
  styleUrls: ['./admin-profits.component.scss']
})
export class AdminProfitsComponent implements OnInit {

  profits:MagazineProfitDto[] = [];
  subscriptionsProfits:SubscriptionProfitDto[] = [];
  fromDate:string;
  untilDate:string;
  global:GlobalProfitDto;

  constructor(
    private reportService:MagazineReportService,
    private toasterService:ToasterService,
  ) {
  }

  ngOnInit() {
    this.initDates();
    this.findAll();
  }

  private initDates(){
    let currentDate = new Date();
    this.untilDate = currentDate.toISOString().substring(0, 10);
    let lastDate = new Date();
    lastDate.setMonth(currentDate.getMonth() - 1);
    this.fromDate = lastDate.toISOString().substring(0, 10);
  }

  findAll(){
    this.reportService.findMagazineProfits(this.fromDate, this.untilDate).subscribe({
      next: (profits) => {
        this.profits = profits ?? [];
      }, error: _ => this.toasterService.showDefaultError()
    });
    this.reportService.findGlobalProfits(this.fromDate, this.untilDate).subscribe({
      next: (profits) => {
        this.global = profits;
      }, error: _ => this.toasterService.showDefaultError()
    });
  }

  openModal(profit:MagazineProfitDto, modal:ModalComponent){
    this.reportService.findSubscriptionProfits(profit.magazineId, this.fromDate, this.untilDate).subscribe({
      next: (profits) => {
        this.subscriptionsProfits = profits ?? [];
        modal.open(undefined);
      }, error: _ => this.toasterService.showDefaultError()
    });
  }

}
