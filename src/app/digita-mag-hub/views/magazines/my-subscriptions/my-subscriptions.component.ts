import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MagazineDto, MagazineLikeRequest } from 'src/app/data/models/model';
import { MagazineLikeService } from 'src/app/services/other/magazine/magazine-like.service';
import { MagazineService } from 'src/app/services/other/magazine/magazine.service';
import { ToasterService } from 'src/app/services/other/toaster/toaster.service';

@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.scss']
})
export class MySubscriptionsComponent {

  magazineList: MagazineDto[] = [];
  isLiked: boolean = false;

  constructor(
    private magazineService: MagazineService,
    private toasterService:ToasterService,
    private router:Router,
  ){}

  ngOnInit(): void {
    this.magazineService.mySubscription().subscribe({
      next: (magazines) => {
        this.magazineList = magazines;
      },
      error: err => {
        console.log(err);
        this.toasterService.showError('Error en el servidor, intente más tarde');
      }
    });
  }

  goToSubscription(magazineId:number){
    void this.router.navigate(['/digital/magazines/subscription/', magazineId]);
  }

  goToViewMagazine(magazineId:number){
    void this.router.navigate(['/digital/magazines/subscription/' + magazineId + '/view'])
  }

}
