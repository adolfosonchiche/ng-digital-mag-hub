import {Component, OnInit} from '@angular/core';
import {MagazineService} from "../../../../services/other/magazine/magazine.service";
import {MagazineDto, MagazineReactionStatusDto} from "../../../../data/models/model";
import {ToasterService} from "../../../../services/other/toaster/toaster.service";
import { CategoryEnum } from 'src/global/category-enum';

@Component({
  selector: 'app-magazine-list',
  templateUrl: './magazine-list.component.html',
  styleUrls: ['./magazine-list.component.scss']
})
export class MagazineListComponent implements OnInit{

  magazines:MagazineDto[] = [];
  categoryEnums = CategoryEnum;

  constructor(
    private magazineService:MagazineService,
    private toasterService:ToasterService,
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.magazineService.findMyMagazines().subscribe({
      next: (magazines) => {
        this.magazines = magazines ?? [];
      }, error: _ => this.toasterService.showDefaultError()
    });
  }

  blockedOrUnblocked(magazineSelected: MagazineDto) {
    const newStatus = (magazineSelected.catReactionStatus.categoryId == this.categoryEnums.ACTIVE) ? this.categoryEnums.BLOCKED : this.categoryEnums.ACTIVE
    const request = new MagazineReactionStatusDto(magazineSelected.magazineId, newStatus);
    this.magazineService.changeReactionStatus(request).subscribe({
        next: () => {
            this.getAll();
        },
        error: (err) => {
            console.log(err);
            this.toasterService.showError("No se puede bloquear las interacciones, intente más tarde");
        }
    });
  }

}
