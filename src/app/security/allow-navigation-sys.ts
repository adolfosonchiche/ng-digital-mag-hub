import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUserService } from '../services/auth/current-user.service';
import { ToasterService } from '../services/other/toaster/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class AllowNavigationSys {

  constructor(
    private router: Router,
    private currentUserService: CurrentUserService,
    private toaster: ToasterService,
  ) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.currentUserService.isAuthenticated()) {
      this.toaster.showSuccess("Sesión activa");
      return this.router.navigate(['/digital/dashboard']);
    }
    return true;
  }

}
