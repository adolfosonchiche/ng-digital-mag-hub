import {Component, OnInit} from '@angular/core';
import {CategoryDto, MagazineDto} from "../../../../data/models/model";
import {MagazineService} from "../../../../services/other/magazine/magazine.service";
import {ToasterService} from "../../../../services/other/toaster/toaster.service";
import {CategoryEnum} from "../../../../../global/category-enum";
import * as moment from 'moment';
import {CategoryService} from "../../../../services/other/category/category.service";

@Component({
  selector: 'app-magazine-search',
  templateUrl: './magazine-search.component.html',
  styleUrls: ['./magazine-search.component.scss']
})
export class MagazineSearchComponent implements OnInit {

  magazines:MagazineDto[] = [];
  magazineCategories:CategoryDto[] = [];
  categories:CategoryDto[] = [];
  textFilter:string = "";
  params = new Map<string, any>;
  typingTimer:any;
  typingInterval = 750;

  constructor(
    private magazineService:MagazineService,
    private toasterService:ToasterService,
    private categoryService:CategoryService,
  ) {
  }

  ngOnInit(): void {
    this.params.set("categoryStatus", CategoryEnum.MAGAZINE_PUBLISHED);
    this.findAll();
    this.getMagazineTypes();
  }

  onKeyUp(){
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => this.findAllWithFilters(), this.typingInterval);
  }

  findAllWithFilters(){
    this.params.set("fullText", this.textFilter);
    this.params.set("categoryList", this.categories.map(category => category.categoryId).join(','))
    this.findAll();
  }

  findAll(){
    this.magazineService.findByQuery(this.params).subscribe({
      next: (magazines) => {
        this.magazines = magazines ?? [];
        this.updateDates();
      }, error: _ => this.toasterService.showDefaultError()
    });
  }

  private getMagazineTypes(){
    this.categoryService.getByParent(CategoryEnum.MAGAZINE_CATEGORY).subscribe({
      next: (categories) => {
        this.magazineCategories = categories ?? [];
      }, error: _  => this.toasterService.showDefaultError()
    })
  }

  private updateDates(){
    this.magazines.forEach(magazine => magazine.entryDate = moment(magazine.entryDate).locale('es').format('MMMM YYYY'));
  }

}
