import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  GlobalProfitDto,
  MagazineDto,
  MagazineProfitDto,
  MagazineSubscriptionDto,
  SubscriptionProfitDto
} from "../../../data/models/model";
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

  findSubscriptions(magazineId:number, fromDate:string, untilDate:string):Observable<MagazineSubscriptionDto[]>{
    let httpParams = new HttpParams();
    httpParams = httpParams.set('fromDate', fromDate);
    httpParams = httpParams.set('untilDate', untilDate);
    return this.http.get<MagazineSubscriptionDto[]>(`${baseUrl}/subscriptions/${magazineId}`, {params: httpParams})
  }

  findGlobalProfits(fromDate:string, untilDate:string):Observable<GlobalProfitDto>{
    let httpParams = new HttpParams();
    httpParams = httpParams.set('from', fromDate);
    httpParams = httpParams.set('until', untilDate);
    return this.http.get<GlobalProfitDto>(`${baseUrl}/profits/global`, {params: httpParams})
  }

  findMagazineProfits(fromDate:string, untilDate:string):Observable<MagazineProfitDto[]>{
    let httpParams = new HttpParams();
    httpParams = httpParams.set('from', fromDate);
    httpParams = httpParams.set('until', untilDate);
    return this.http.get<MagazineProfitDto[]>(`${baseUrl}/profits/magazine`, {params: httpParams})
  }

  findSubscriptionProfits(magazineId:number, fromDate:string, untilDate:string):Observable<SubscriptionProfitDto[]>{
    let httpParams = new HttpParams();
    httpParams = httpParams.set('from', fromDate);
    httpParams = httpParams.set('until', untilDate);
    return this.http.get<SubscriptionProfitDto[]>(`${baseUrl}/profits/subscription/${magazineId}`, {params: httpParams})
  }

}
