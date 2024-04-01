import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../../services/other/category/category.service";
import {CategoryDto, NewMagazineDto} from "../../../../data/models/model";
import {CategoryEnum} from "../../../../../global/category-enum";
import {ToasterService} from "../../../../services/other/toaster/toaster.service";
import {MagazineService} from "../../../../services/other/magazine/magazine.service";
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
  coverLoaded:boolean = false;

  constructor(
    private categoryService:CategoryService,
    private toasterService:ToasterService,
    private magazineService:MagazineService,
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
    this.checkAllIsValid().then((allIsValid) => {
      if (allIsValid) {
        this.magazineService.create(this.newMagazine).subscribe({
          next: (magazine) => {
            this.toasterService.showSuccess("Revista creada", "Success");
            void this.router.navigate(["/digital/magazines"])
          }, error: _ => this.toasterService.showDefaultError()
        });
      } else {
        this.toasterService.showError("Completa todos los campos.", "Error");
      }
    });
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

  loadCover(event:any){
    this.coverLoaded = false;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64 = reader.result;
      if (base64) {
        this.newMagazine.cover = base64 + '';
        this.coverLoaded = true;
      }
    }
  }

  checkAllIsValid():Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      resolve(
        this.newMagazine.name &&
        this.newMagazine.name.trim() != "" &&
        this.newMagazine.description &&
        this.newMagazine.description.trim() != "" &&
        this.newMagazine.catCategory != undefined &&
        this.newMagazine.entryDate != undefined &&
        this.newMagazine.file != undefined &&
        this.newMagazine.cover != undefined &&
        this.newMagazine.subscriptionCost != undefined &&
        this.newMagazine.subscriptionCost > 0
      );
    });
  }

}
