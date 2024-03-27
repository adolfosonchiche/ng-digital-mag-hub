import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {MagazineRateDto, NewMagazineRateDto} from "../../../data/models/model";
import {Observable} from "rxjs";

const baseUrl = environment.digitalMagHubUrl + '/v1/rates';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(
    private http: HttpClient,
  ) { }

  create(dto:NewMagazineRateDto):Observable<any>{
    return this.http.post<any>(`${baseUrl}`, dto);
  }

  find(magazineId:number):Observable<MagazineRateDto>{
    return this.http.get<MagazineRateDto>(`${baseUrl}/${magazineId}`);
  }

}
