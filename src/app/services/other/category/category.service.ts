import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CategoryDto} from "../../../data/models/adm-usesr";
import {Observable} from "rxjs";

const baseUrl = environment.digitalMagHubUrl + '/v1/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getByParent(parentId:number):Observable<CategoryDto[]>{
    return this.http.get<CategoryDto[]>(`${baseUrl}/parent/${parentId}`);
  }

}
