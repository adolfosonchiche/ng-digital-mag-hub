import { Component, NgModuleDecorator, OnInit } from '@angular/core';
import { MagazineCommentDto, MagazineDto } from 'src/app/data/models/model';
import { MagazineCommentService } from 'src/app/services/other/magazine/magazine-comment.service';
import { MagazineService } from 'src/app/services/other/magazine/magazine.service';
import { ToasterService } from 'src/app/services/other/toaster/toaster.service';

@Component({
  selector: 'app-magazine-comment',
  templateUrl: './magazine-comment.component.html',
  styleUrls: ['./magazine-comment.component.scss']
})
export class MagazineCommentComponent implements OnInit {

  commentsList : MagazineCommentDto[] = [];
  magazines:MagazineDto[] = [];
  magazineSelected!: MagazineDto;

  constructor(
    private magazineService:MagazineService,
    private toasterService:ToasterService,
    private magazineCommentService: MagazineCommentService,
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

  getComments() {
    this.commentsList = [];
    this.magazineCommentService.getMagazineCommentList(this.magazineSelected.magazineId).subscribe({
      next: (coments) => {
        this.commentsList = coments;
      },
      error: err => {
        console.log(err)
      }
    });
  }

  

}
