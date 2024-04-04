import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MagazineReationDto } from 'src/app/data/models/model';
import { MagazineReactionReportService } from 'src/app/services/other/magazine/magazine-reaction-report.service';
import { ToasterService } from 'src/app/services/other/toaster/toaster.service';

@Component({
  selector: 'app-magazine-most-comment',
  templateUrl: './magazine-most-comment.component.html',
  styleUrls: ['./magazine-most-comment.component.scss']
})
export class MagazineMostCommentComponent {

  mostCommentList: MagazineReationDto[] = [];

  constructor(
    private magazineReactionReportService: MagazineReactionReportService,
    private toasterService:ToasterService,
    private router:Router,
  ){}

  ngOnInit(): void {
    this.magazineReactionReportService.getMagazineMostComment().subscribe({
      next: (comments) => {
        this.mostCommentList = comments;
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
