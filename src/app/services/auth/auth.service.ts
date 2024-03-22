import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, tap } from 'rxjs/operators';
import { ToasterService } from '../other/toaster/toaster.service';
import { environment } from 'src/environments/environment';
import { User, UserDto } from 'src/app/data/models/model';
import { CurrentUserService } from './current-user.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LayoutControlService } from 'src/app/nab-commons/services/layout-control.service';

const baseUrl = environment.digitalMagHubUrl + '/v1/auth';

@Injectable({
  providedIn: 'root',
})

export class AuthService {


  constructor(
    private http: HttpClient,
    private toaster: ToasterService,
    private router:Router,
    private currentUser: CurrentUserService,
    private layoutControlService: LayoutControlService
  ) {
  }

  doLogin(
    userDto: UserDto,
    loginRequest: any
  ): void {
    this.http.post<any>(`${baseUrl}/sign-in`, loginRequest)
      .pipe(
        tap(token => {
            console.log(token)
          this.storeToken(token.jwt);
          return of('');
        }),
      )
      .subscribe({
        next: _ => {
            this.layoutControlService.showNavbar();
            this.currentUser.updateCurrentUser(userDto);
        },
        error: err => {this.toaster.showError("Error en inicio de sesión"); console.log(err)},
    });
  }

  getToken(): string | null {
    return localStorage.getItem('tok-ayd');
  }

  storeToken(token: string): void {
    if (token.startsWith('Bearer ')) {
      token = token.substring('Bearer '.length);
    }
    localStorage.setItem('tok-ayd', token);
  }

  getTokenPayload(): any | null {
    const jwt = this.getToken();
    if (! jwt) {
      return null;
    }
    const jwtSplited = jwt.split(".");
    if(jwtSplited.length != 3) {
      return null;
    }
    const payload = jwtSplited[1];
    return JSON.parse(atob(payload));
  }

}
