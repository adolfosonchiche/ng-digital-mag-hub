import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../../services/other/category/category.service";
import {CategoryDto, NewMagazineDto} from "../../../../data/models/model";
import {CategoryEnum} from "../../../../../global/category-enum";
import {ToasterService} from "../../../../services/other/toaster/toaster.service";
import {MagazineService} from "../../../../services/other/magazine/magazine.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-magazine-crud',
  templateUrl: './magazine-crud.component.html',
  styleUrls: ['./magazine-crud.component.scss']
})
export class MagazineCrudComponent implements OnInit{

  magazineCategories:CategoryDto[];
  newMagazine:NewMagazineDto;
  fileLoaded:boolean = false;
  resource:SafeResourceUrl;

  constructor(
    private categoryService:CategoryService,
    private toasterService:ToasterService,
    private magazineService:MagazineService,
    private sanitizer:DomSanitizer,
    private router:Router,
  ) {
  }

  ngOnInit(): void {
    this.getMagazineTypes();
    this.newMagazine = new NewMagazineDto();
  }

  private getMagazineTypes(){
    this.categoryService.getByParent(CategoryEnum.MAGAZINE_CATEGORY).subscribe({
      next: (categories) => {
        this.magazineCategories = categories ?? [];
      }, error: _  => this.toasterService.showDefaultError()
    })
  }

  save(){
    this.magazineService.create(this.newMagazine).subscribe({
      next: (magazine) => {
        this.toasterService.showSuccess("Entity created", "Success");
        const pdfSrc = 'data:application/pdf;base64,' + magazine.file;
        this.resource = this.sanitizer.bypassSecurityTrustResourceUrl(pdfSrc);
        void this.router.navigate(["/digital/magazines"])
      }, error: _  => this.toasterService.showDefaultError()
    })
  }


  loadFile(event:any){
    this.fileLoaded = false;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64 = reader.result;
      if (base64) {
        this.newMagazine.file = base64 + '';
        this.fileLoaded = true;
      }
    }
  }

}
