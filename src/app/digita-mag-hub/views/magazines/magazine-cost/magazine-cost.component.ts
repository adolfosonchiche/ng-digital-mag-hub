import {Component, OnInit} from '@angular/core';
import {MagazineDto, UpdateCostMagazineDto} from "../../../../data/models/model";
import {MagazineService} from "../../../../services/other/magazine/magazine.service";
import {ToasterService} from "../../../../services/other/toaster/toaster.service";
import {CategoryEnum} from "../../../../../global/category-enum";
import {ModalComponent} from "../../../../nab-commons/components/modal/modal.component";

@Component({
  selector: 'app-magazine-cost',
  templateUrl: './magazine-cost.component.html',
  styleUrls: ['./magazine-cost.component.scss']
})
export class MagazineCostComponent implements OnInit{

  createdMagazines:MagazineDto[] = [];
  publishedMagazines:MagazineDto[] = [];
  magazineCost:UpdateCostMagazineDto;
  isModalUpdate:boolean;

  constructor(
    private magazineService:MagazineService,
    private toasterService:ToasterService,
  ) {
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    let paramsCreated = new Map<string, any>;
    paramsCreated.set("categoryStatus", CategoryEnum.MAGAZINE_CREATED);
    this.magazineService.findByQuery(paramsCreated).subscribe({
      next: (magazines) => {
        this.createdMagazines = magazines ?? [];
      }, error: _ => this.toasterService.showDefaultError()
    });
    let paramsPublished = new Map<string, any>;
    paramsPublished.set("categoryStatus", CategoryEnum.MAGAZINE_PUBLISHED);
    this.magazineService.findByQuery(paramsPublished).subscribe({
      next: (magazines) => {
        this.publishedMagazines = magazines ?? [];
      }, error: _ => this.toasterService.showDefaultError()
    });
    this.magazineCost = new UpdateCostMagazineDto();
  }

  updateCost(){
    this.magazineService.updateCost(this.magazineCost).subscribe({
      next: (magazine) => {
        this.findAll();
        this.toasterService.showSuccess("El costo de '" + magazine.name + "' ha sido actualizado.", "Éxito");
      }, error: _ => this.toasterService.showDefaultError()
    });
  }

  updateCostAndPublish(){
    this.magazineService.updateCostAndPublish(this.magazineCost).subscribe({
      next: (magazine) => {
        this.findAll();
        this.toasterService.showSuccess("El costo de '" + magazine.name + "' ha sido actualizado.", "Éxito");
      }, error: _ => this.toasterService.showDefaultError()
    });
  }

  openAssignModal(magazine:MagazineDto, assignCostModal:ModalComponent, isUpdate:boolean){
    this.isModalUpdate = isUpdate;
    this.magazineCost.magazineId = magazine.magazineId;
    this.magazineCost.name = magazine.name;
    this.magazineCost.cost = magazine.costPerDay;
    assignCostModal.open(undefined)
  }

}
