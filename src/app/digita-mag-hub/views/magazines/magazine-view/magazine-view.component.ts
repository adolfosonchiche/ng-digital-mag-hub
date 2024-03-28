import {Component, OnDestroy, OnInit} from '@angular/core';
import {MagazineService} from "../../../../services/other/magazine/magazine.service";
import {ToasterService} from "../../../../services/other/toaster/toaster.service";
import {ActivatedRoute} from "@angular/router";
import {MagazineViewDto} from "../../../../data/models/model";

@Component({
  selector: 'app-magazine-view',
  templateUrl: './magazine-view.component.html',
  styleUrls: ['./magazine-view.component.scss']
})
export class MagazineViewComponent implements OnInit, OnDestroy {

  magazineId:number;
  magazineView:MagazineViewDto;
  blobUrl:string;

  constructor(
    private magazineService:MagazineService,
    private toasterService:ToasterService,
    private activatedRoute:ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.magazineId = Number(this.activatedRoute.snapshot.params['magazineId'] ?? 0);
    this.magazineService.findViewById(this.magazineId).subscribe({
      next: (dto) => {
        this.magazineView = dto;
        this.loadFile();
      },
      error: _ => this.toasterService.showError("No existe este recurso.")
    });
  }

  ngOnDestroy(): void {
    URL.revokeObjectURL(this.blobUrl);
  }

  loadFile(){
    const pdfBlob = this.base64toBlob(this.magazineView.file, 'application/pdf');
    this.blobUrl = URL.createObjectURL(pdfBlob);
    (document.getElementById('pdfCard') as HTMLEmbedElement).src = this.blobUrl;
  }

  base64toBlob(base64Data:string, contentType:string) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

}
