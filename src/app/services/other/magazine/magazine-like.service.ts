import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import { MagazineLikeDto, MagazineLikeRequest } from 'src/app/data/models/model';

const baseUrl = environment.digitalMagHubUrl + '/v1/magazine-like';

@Injectable({
  providedIn: 'root'
})
export class MagazineLikeService {

  constructor(
    private http: HttpClient
  ) { }

  magazineLike(like: MagazineLikeRequest):Observable<MagazineLikeDto>{
    return this.http.post<MagazineLikeDto>(`${baseUrl}`, like);
  }

  isMagazineLike(magazineId: number):Observable<MagazineLikeDto>{
    return this.http.get<MagazineLikeDto>(`${baseUrl}/${magazineId}`);
  }
}