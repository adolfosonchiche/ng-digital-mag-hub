import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MagazineDto } from 'src/app/data/models/model';
import { ModalComponent } from 'src/app/nab-commons/components/modal/modal.component';
import { MagazineService } from 'src/app/services/other/magazine/magazine.service';



@Component({
  selector: 'app-modal-magazine-preview',
  templateUrl: './modal-magazine-preview.component.html',
  styleUrls: ['./modal-magazine-preview.component.scss']
})
export class ModalMagazinePreviewComponent extends ModalComponent {

  constructor(
    private ngbModal: NgbModal,
    private magazineService: MagazineService,
  ) {
    super(ngbModal)
  }

  magazineDto: MagazineDto
  pdfBase64: any;


  openModal(magazine: MagazineDto) {
    this.magazineDto = magazine
    this.magazineService.findViewById(this.magazineDto.magazineId).subscribe({
      next: (dto) => {
        console.log(dto)
        this.pdfBase64 = dto.file;
        this.open(undefined);
      },
      error: _ => console.log('error al obtener el archivo')
    });
  }

}
