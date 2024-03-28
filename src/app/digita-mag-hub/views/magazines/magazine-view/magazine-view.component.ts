import {Component, OnInit} from '@angular/core';
import {MagazineService} from "../../../../services/other/magazine/magazine.service";
import {ToasterService} from "../../../../services/other/toaster/toaster.service";
import {ActivatedRoute} from "@angular/router";
import {MagazineViewDto} from "../../../../data/models/model";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-magazine-view',
  templateUrl: './magazine-view.component.html',
  styleUrls: ['./magazine-view.component.scss']
})
export class MagazineViewComponent implements OnInit {

  magazineId:number;
  magazineView:MagazineViewDto;
  resource:SafeResourceUrl;
  blobUrl:string;

  constructor(
    private magazineService:MagazineService,
    private toasterService:ToasterService,
    private activatedRoute:ActivatedRoute,
    private sanitizer:DomSanitizer,
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

  loadFile(){
    const pdfSrc = 'data:application/pdf;base64,' + this.magazineView.file;
    this.resource = this.sanitizer.bypassSecurityTrustResourceUrl(pdfSrc);
    const pdfBlob = this.base64toBlob(this.magazineView.file, 'application/pdf');
    const blobUrl = URL.createObjectURL(pdfBlob);
    const newTab = window.open(blobUrl, '_blank');
    this.blobUrl = blobUrl;
  }

  base64toBlob(base64Data, contentType) {
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
