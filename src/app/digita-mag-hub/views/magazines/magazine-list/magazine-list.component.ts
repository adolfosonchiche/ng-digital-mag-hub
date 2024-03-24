import {Component, OnInit} from '@angular/core';
import {MagazineService} from "../../../../services/other/magazine/magazine.service";
import {MagazineDto} from "../../../../data/models/model";
import {ToasterService} from "../../../../services/other/toaster/toaster.service";

@Component({
  selector: 'app-magazine-list',
  templateUrl: './magazine-list.component.html',
  styleUrls: ['./magazine-list.component.scss']
})
export class MagazineListComponent implements OnInit{

  magazines:MagazineDto[] = [];

  constructor(
    private magazineService:MagazineService,
    private toasterService:ToasterService,
  ) {
  }

  ngOnInit(): void {
    this.magazineService.findMyMagazines().subscribe({
      next: (magazines) => {
        this.magazines = magazines ?? [];
      }, error: _ => this.toasterService.showDefaultError()
    });
  }

}
