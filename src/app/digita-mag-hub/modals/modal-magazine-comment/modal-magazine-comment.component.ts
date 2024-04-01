import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MagazineCommentRequest, MagazineDto } from 'src/app/data/models/model';
import { ModalComponent } from 'src/app/nab-commons/components/modal/modal.component';
import { MagazineCommentService } from 'src/app/services/other/magazine/magazine-comment.service';
import { ToasterService } from 'src/app/services/other/toaster/toaster.service';

@Component({
  selector: 'app-modal-magazine-comment',
  templateUrl: './modal-magazine-comment.component.html',
  styleUrls: ['./modal-magazine-comment.component.scss']
})
export class ModalMagazineCommentComponent extends ModalComponent {

  magazineDto: MagazineDto;
  comment: string = '';
  @Output() modalCallback = new EventEmitter<boolean>();

  constructor(
    private ngbModal: NgbModal,
    private magazineCommentService: MagazineCommentService,
    private toasterService:ToasterService,
  ){
    super(ngbModal);
  }

  openModal(magazine: MagazineDto) {
    this.magazineDto = magazine;
    this.open(undefined)
  }

  saveComment() {
    let newComment = new MagazineCommentRequest();
    newComment.magazineId = this.magazineDto.magazineId;
    newComment.comment = this.comment;
    this.magazineCommentService.createMagazineComment(newComment).subscribe({
      next: () => {
        this.toasterService.showSuccess('Comentario creado');
        this.modalCallback.emit(true);
        this.close();
      },
      error: err => {
        console.log(err)
        this.toasterService.showError('No se guardo el comentario, intente más tarde');
        this.close();
      }
    });
  }

}
