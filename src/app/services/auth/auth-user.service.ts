import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators'
import { User, UserDto } from 'src/app/data/models/adm-usesr';
import { environment } from 'src/environments/environment';

const baseUrl = environment.digitalMagHubUrl + '/v1/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthUsersService {

    constructor(
        private http: HttpClient
    ) { }

    checkEmail(email: string): Observable<any> {
        return this.http.get<any>(`${baseUrl}/check-email/${email}`, { observe: "body" }).pipe(
            map(data => {
                return !data ? { status: false, apiCommunication: false, changes: false } : { status: true, apiCommunication: false, changes: false };
            }),
            catchError(error => {
                return of({ status: false, apiCommunication: true, changes: false });
            })
        );
    }

    save(user: User): Observable<UserDto> {
        if (user.userId) {
            return this.http.put<UserDto>(`${baseUrl}/${user.userId}`, user);
        }
        return this.http.post<any>(`${baseUrl}/sign-up`, user);
    }
}
