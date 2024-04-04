import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MagazineReationDto } from 'src/app/data/models/model';
import { MagazineReactionReportService } from 'src/app/services/other/magazine/magazine-reaction-report.service';
import { ToasterService } from 'src/app/services/other/toaster/toaster.service';

@Component({
  selector: 'app-magazine-most-like',
  templateUrl: './magazine-most-like.component.html',
  styleUrls: ['./magazine-most-like.component.scss']
})
export class MagazineMostLikeComponent implements OnInit {

  mostLikeList: MagazineReationDto[] = [];

  constructor(
    private magazineReactionReportService: MagazineReactionReportService,
    private toasterService:ToasterService,
    private router:Router,
  ){}

  ngOnInit(): void {
    this.magazineReactionReportService.getMagazineMostLike().subscribe({
      next: (likes) => {
        this.mostLikeList = likes;
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

}
