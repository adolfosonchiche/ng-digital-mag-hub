import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ToasterEnum } from "src/global/toaster-enum";
import jwt_decode from 'jwt-decode';
import { User, UserDto } from 'src/app/data/models/model';
import { ToasterService } from '../other/toaster/toaster.service';
import { LayoutControlService } from 'src/app/nab-commons/services/layout-control.service';
import { UsersService } from '../other/amd-user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

    private preventMultiCalls$ = new Subject();
  private dataSource = new BehaviorSubject<UserDto | undefined>(undefined);
  currentData = this.dataSource.asObservable();

  constructor(
    private router: Router,
    private toaster: ToasterService,
    private userService: UsersService,
    private layoutControlService: LayoutControlService
  ) {
    this.logoutMultiCall();
    let jsonData = localStorage.getItem('profile');
    if (jsonData) {
      let data = JSON.parse(jsonData);
      this.dataSource.next(data);
      layoutControlService.showNavbar();
    } else {
      this.dataSource.next(undefined);
      layoutControlService.hideNavbar();
    }
  }

  isAuthenticated(): boolean {
    const authToken = localStorage.getItem('tok-ayd');
    if (!authToken !== undefined && authToken !== null) {
      const helper = new JwtHelperService();
      if (helper.isTokenExpired(authToken)) {
        localStorage.clear();
        return false;
      }
      return true;
    }
    return false;
  }

  logoutMultiCall() {
    this.preventMultiCalls$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe({
      next: () => {
        this.clearToken();
        this.dataSource.next(new UserDto());
        this.router.navigate(['/']);
      }
    });
  }

  clearToken() {
    localStorage.clear();
  }

  updateCurrentUser(userData: UserDto | undefined) {
    if (!userData) {
      this.userService.getMe().subscribe({
        next: (user) => {
          this.dataSource.next(user);
          localStorage.setItem('profile', JSON.stringify(user));
          this.toaster.showSuccess('Inicio de sesión Éxitoso');
          this.router.navigate(['/digital/dashboard'])
        }, error: () => {
          this.logoutWithError();
        }
      });
    } else {
      this.dataSource.next(userData);
      localStorage.setItem('profile', JSON.stringify(userData));
      this.toaster.showSuccess('Inicio de sesión Éxitoso');
      this.router.navigate(['/digital/dashboard'])
    }
  }

  logoutWithMessage(message: string, header: string) {
    this.toaster.show({ message: message, header: header, type: ToasterEnum.ERROR });
    this.logout();
  }

  logoutWithError() {
    this.toaster.show({ message: "Error en el servidor, intente mas tarde", header: "Error ", type: ToasterEnum.ERROR });
    this.logout();
  }

  logout() {
    this.preventMultiCalls$.next(new Date());
    this.layoutControlService.hideNavbar();
  }

  getInitials(user: UserDto | undefined) {
    if (!user) {
      return 'Me';
    }
    const names = (user.fullName ?? "").split(" ");
    if (names.length == 1) {
      return `${names[0].substring(0, 2)}`.toUpperCase();
    } else if (names.length) {
      return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase();
    } else {
      return 'Me';
    }
  }

  getMyRole(): any {
    let authToken = localStorage.getItem('tok-ayd') + '';
    try {
      let dataToken: any = jwt_decode(authToken);
      return dataToken.roles;
    } catch (error) {
      return undefined;
    }
  }

  getMyClaims() {
    let authToken = localStorage.getItem('tok-ayd') + '';
    try {
      let dataToken: any = jwt_decode(authToken);
      return dataToken;
    } catch (error) {
      return undefined;
    }
  }

  getMe (): UserDto | undefined {
    const profile = localStorage.getItem('profile');
    if(profile) {
      const userDto : UserDto = JSON.parse(profile);
      return userDto;
    }
    return undefined;
  }

}
