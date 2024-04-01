import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import { MagazineCommentDto, MagazineCommentRequest, MagazineLikeDto, MagazineLikeRequest } from 'src/app/data/models/model';

const baseUrl = environment.digitalMagHubUrl + '/v1/magazine-comment';

@Injectable({
  providedIn: 'root'
})
export class MagazineCommentService {

  constructor(
    private http: HttpClient
  ) { }

  createMagazineComment(comment: MagazineCommentRequest):Observable<MagazineCommentDto>{
    return this.http.post<MagazineCommentDto>(`${baseUrl}`, comment);
  }

  getMagazineCommentList(magazineId: number):Observable<MagazineCommentDto[]>{
    return this.http.get<MagazineCommentDto[]>(`${baseUrl}/${magazineId}`);
  }
}