import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewSubscriptionDto} from "../../../data/models/model";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

const baseUrl = environment.digitalMagHubUrl + '/v1/subscriptions';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(
    private http: HttpClient,
  ) { }

  create(dto:NewSubscriptionDto):Observable<any>{
    return this.http.post<any>(`${baseUrl}`, dto);
  }

  subscribedTo(magazineId:number):Observable<boolean>{
    return this.http.get<boolean>(`${baseUrl}/subscribed/${magazineId}`);
  }

}
