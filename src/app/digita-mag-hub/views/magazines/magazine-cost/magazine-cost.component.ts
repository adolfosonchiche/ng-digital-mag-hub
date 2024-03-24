import {Component, OnInit} from '@angular/core';
import {MagazineDto} from "../../../../data/models/model";
import {MagazineService} from "../../../../services/other/magazine/magazine.service";
import {ToasterService} from "../../../../services/other/toaster/toaster.service";
import {CategoryEnum} from "../../../../../global/category-enum";

@Component({
  selector: 'app-magazine-cost',
  templateUrl: './magazine-cost.component.html',
  styleUrls: ['./magazine-cost.component.scss']
})
export class MagazineCostComponent implements OnInit{

  createdMagazines:MagazineDto[] = [];

  constructor(
    private magazineService:MagazineService,
    private toasterService:ToasterService,
  ) {
  }

  ngOnInit(): void {
    let params = new Map<string, any>;
    params.set("catStatus", CategoryEnum.MAGAZINE_CREATED);
    this.magazineService.findByQuery(params).subscribe({
      next: (magazines) => {
        this.createdMagazines = magazines ?? [];
      }, error: _ => this.toasterService.showDefaultError()
    });
  }

}
