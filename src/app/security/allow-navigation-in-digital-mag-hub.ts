import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToasterEnum } from 'src/global/toaster-enum';
import { CurrentUserService } from '../services/auth/current-user.service';
import { ToasterService } from '../services/other/toaster/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class AllowNavigationInDigitalMagHub {

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

    if (!this.currentUserService.isAuthenticated()) {
      this.toaster.show({ message: "Vuelve a iniciar sesión", header: "La sesión ha caducado", type: ToasterEnum.ERROR });
      return this.router.navigate(['/login']);
    }
    return true;
  }

}
