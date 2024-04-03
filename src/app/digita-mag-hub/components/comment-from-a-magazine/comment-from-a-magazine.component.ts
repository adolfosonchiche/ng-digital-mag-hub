import { Component, Input, OnInit } from '@angular/core';
import { MagazineCommentDto, MagazineDto } from 'src/app/data/models/model';

@Component({
  selector: 'app-comment-from-a-magazine',
  templateUrl: './comment-from-a-magazine.component.html',
  styleUrls: ['./comment-from-a-magazine.component.scss']
})
export class CommentFromAMagazineComponent implements OnInit {

  @Input() magazineName: string = '';
  @Input()commentsList : MagazineCommentDto[] = [];


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
