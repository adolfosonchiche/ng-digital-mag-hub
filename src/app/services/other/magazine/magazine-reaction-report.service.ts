import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import { MagazineCommentDto, MagazineCommentRequest, MagazineLikeDto, MagazineLikeRequest, MagazineReationDto } from 'src/app/data/models/model';

const baseUrl = environment.digitalMagHubUrl + '/v1/reports/magazine/reaction';

@Injectable({
  providedIn: 'root'
})
export class MagazineReactionReportService {

  constructor(
    private http: HttpClient
  ) { }

  getMagazineMostLike():Observable<MagazineReationDto[]>{
    return this.http.get<MagazineReationDto[]>(`${baseUrl}/most-like`);
  }

  getMagazineMostComment():Observable<MagazineReationDto[]>{
    return this.http.get<MagazineReationDto[]>(`${baseUrl}/most-comment`);
  }
}