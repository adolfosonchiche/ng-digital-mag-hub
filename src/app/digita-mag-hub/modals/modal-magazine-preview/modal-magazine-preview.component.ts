import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MagazineDto } from 'src/app/data/models/model';
import { ModalComponent } from 'src/app/nab-commons/components/modal/modal.component';



@Component({
  selector: 'app-modal-magazine-preview',
  templateUrl: './modal-magazine-preview.component.html',
  styleUrls: ['./modal-magazine-preview.component.scss']
})
export class ModalMagazinePreviewComponent extends ModalComponent {

  constructor(
    private ngbModal: NgbModal
  ) {
    super(ngbModal)
  }

  magazineDto: MagazineDto
  pdfBase64: any;


  openModal(magazine: MagazineDto) {
    this.magazineDto = magazine
    this.pdfBase64 = magazine.file;
    this.open(undefined)
  }

}
