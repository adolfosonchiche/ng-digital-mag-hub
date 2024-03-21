import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators'
import { User, UserDto } from 'src/app/data/models/model';
import { environment } from 'src/environments/environment';

const baseUrl = environment.digitalMagHubUrl + '/v1/users';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(
        private http: HttpClient
    ) { }

    getMe(): Observable<UserDto> {
        return this.http.get<UserDto>(`${baseUrl}/me`);
    }



}
