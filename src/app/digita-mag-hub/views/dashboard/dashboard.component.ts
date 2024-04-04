import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MagazineDto, Role } from 'src/app/data/models/model';
import { MagazineService } from 'src/app/services/other/magazine/magazine.service';
import { ToasterService } from 'src/app/services/other/toaster/toaster.service';
import { RolEnum } from 'src/global/roles-enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  magazines:MagazineDto[] = [];
  roleEnum = RolEnum;

  constructor(
    private magazineService:MagazineService,
    private toasterService:ToasterService,
    private router:Router,
  ){}

  ngOnInit(): void {
    this.magazineService.getLatestMagazines().subscribe({
      next: (magazines) => {
        this.magazines = magazines;
      },
      error: err => {
        console.log(err);
      }
    });
  }




  goToSubscription(magazineId:number){
    void this.router.navigate(['/digital/magazines/subscription/', magazineId]);
  }

}
