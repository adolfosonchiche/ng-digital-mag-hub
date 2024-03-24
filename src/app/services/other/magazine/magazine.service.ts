import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {MagazineDto, NewMagazineDto} from "../../../data/models/model";
import {environment} from "../../../../environments/environment";

const baseUrl = environment.digitalMagHubUrl + '/v1/magazines';

@Injectable({
  providedIn: 'root'
})
export class MagazineService {

  constructor(
    private http: HttpClient
  ) { }

  create(newMagazine:NewMagazineDto):Observable<MagazineDto>{
    return this.http.post<MagazineDto>(`${baseUrl}`, newMagazine);
  }

  findMyMagazines():Observable<MagazineDto[]>{
    return this.http.get<MagazineDto[]>(`${baseUrl}/my`)
  }

  findByQuery(params:Map<string, any>):Observable<MagazineDto[]>{
    let httpParams = new HttpParams();
    params.forEach((value, key) => {
      if (value && key)  params.set(key, value);
    });
    return this.http.get<MagazineDto[]>(`${baseUrl}`, {params: httpParams});
  }

}
