import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MagazineDto, UserDto } from 'src/app/data/models/model';
import { ModalComponent } from 'src/app/nab-commons/components/modal/modal.component';
import { MagazineService } from 'src/app/services/other/magazine/magazine.service';

@Component({
  selector: 'app-modal-view-editor-profile',
  templateUrl: './modal-view-editor-profile.component.html',
  styleUrls: ['./modal-view-editor-profile.component.scss']
})
export class ModalViewEditorProfileComponent extends ModalComponent {

  editorDto : UserDto;
  magazineList: MagazineDto[] = [];

  constructor(
    private ngbModal: NgbModal,
    private magazineService: MagazineService,
    private router:Router,
  ) {
    super(ngbModal)
  }

  openModal(editor: UserDto) {
    this.editorDto = editor;
    this.magazineService.findMagazineByEditorId(editor.userId).subscribe({
      next: (dto) => {
        console.log(dto)
        this.magazineList = dto;
        this.open(undefined);
      },
      error: _ => console.log('error al obtener las revistas')
    });
  }

}
