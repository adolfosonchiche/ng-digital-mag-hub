import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { MagazineDto, MagazineSubscriptionDto } from "../../../data/models/model";
import {environment} from "../../../../environments/environment";

const baseUrl = environment.digitalMagHubUrl + '/v1/reports/magazine';

@Injectable({
  providedIn: 'root'
})
export class MagazineReportService {

  constructor(
    private http: HttpClient
  ) { }

  findByMostSubscriptions(fromDate:string, untilDate:string):Observable<MagazineDto[]>{
    let httpParams = new HttpParams();
    httpParams = httpParams.set('fromDate', fromDate);
    httpParams = httpParams.set('untilDate', untilDate);
    return this.http.get<MagazineDto[]>(`${baseUrl}/by-most-subscriptions`, {params: httpParams})
  }

  findSubscriptions(magazineId:number):Observable<MagazineSubscriptionDto[]>{
    return this.http.get<MagazineSubscriptionDto[]>(`${baseUrl}/subscriptions/${magazineId}`)
  }

}
