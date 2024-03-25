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
  magazineCost:UpdateCostMagazineDto;

  constructor(
    private magazineService:MagazineService,
    private toasterService:ToasterService,
  ) {
  }

  ngOnInit(): void {
    let params = new Map<string, any>;
    params.set("categoryStatus", CategoryEnum.MAGAZINE_CREATED);
    this.magazineService.findByQuery(params).subscribe({
      next: (magazines) => {
        this.createdMagazines = magazines ?? [];
      }, error: _ => this.toasterService.showDefaultError()
    });
    this.magazineCost = new UpdateCostMagazineDto();
  }

  updateCostAndPublish(){
    this.magazineService.updateCostAndPublish(this.magazineCost).subscribe({
      next: (magazine) => {
        this.toasterService.showSuccess("El costo de '" + magazine.name + "' ha sido actualizado.", "Éxito");
      }, error: _ => this.toasterService.showDefaultError()
    });
  }

  openAssignModal(magazine:MagazineDto, assignCostModal:ModalComponent){
    this.magazineCost.magazineId = magazine.magazineId;
    this.magazineCost.name = magazine.name;
    assignCostModal.open(undefined)
  }

}
