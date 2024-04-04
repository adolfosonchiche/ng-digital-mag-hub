import {Component, OnInit} from '@angular/core';
import {GlobalProfitDto, MagazineDto, MagazineProfitDto, SubscriptionProfitDto} from "../../../../data/models/model";
import {MagazineService} from "../../../../services/other/magazine/magazine.service";
import {ToasterService} from "../../../../services/other/toaster/toaster.service";
import {ModalComponent} from "../../../../nab-commons/components/modal/modal.component";
import {MagazineReportService} from "../../../../services/other/magazine/magazine-report.service";

@Component({
  selector: 'app-editor-profits',
  templateUrl: './editor-profits.component.html',
  styleUrls: ['./editor-profits.component.scss']
})
export class EditorProfitsComponent implements OnInit {

  magazines:MagazineDto[] = [];
  subscriptionsProfits:SubscriptionProfitDto[] = [];
  fromDate:string;
  untilDate:string;
  global:GlobalProfitDto;

  constructor(
    private magazineService:MagazineService,
    private toasterService:ToasterService,
    private reportService:MagazineReportService,
  ) {
  }

  ngOnInit(): void {
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

  findAll() {
    this.magazineService.findMyMagazines().subscribe({
      next: (magazines) => {
        this.magazines = magazines ?? [];
      }, error: _ => this.toasterService.showDefaultError()
    });
    this.reportService.findMyGlobalProfits(this.fromDate, this.untilDate).subscribe({
      next: (profits) => {
        this.global = profits;
      }, error: _ => this.toasterService.showDefaultError()
    });
  }

  openModal(profit:MagazineDto, modal:ModalComponent){
    this.reportService.findMySubscriptionProfits(profit.magazineId, this.fromDate, this.untilDate).subscribe({
      next: (profits) => {
        this.subscriptionsProfits = profits ?? [];
        modal.open(undefined);
      }, error: _ => this.toasterService.showDefaultError()
    });
  }

}
