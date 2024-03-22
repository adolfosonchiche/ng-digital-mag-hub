import { Component } from '@angular/core';
import { LayoutControlService } from 'src/app/nab-commons/services/layout-control.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private layoutControlService: LayoutControlService
  ){
    this.layoutControlService.hideNavbar();
  }

  loginRequest = { email: '', password: '' };
  showErrorLogin = false;
  showPass = false;

  doLogin():void {
    this.authService.doLogin(undefined, this.loginRequest);
  }

  isValid() {
    return this.loginRequest.email && this.loginRequest.password;
  }

  togglePass() {
    this.showPass = !this.showPass;
  }

}
