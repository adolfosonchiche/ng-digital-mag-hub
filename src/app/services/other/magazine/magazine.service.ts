import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

}
