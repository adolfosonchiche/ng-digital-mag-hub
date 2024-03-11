import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginRequest = { user: '', password: '' };
  showErrorLogin = false;
  showPass = false;

  doLogin():void {
    console.log('login')
  }

  isValid() {
    return this.loginRequest.user && this.loginRequest.password;
  }

  togglePass() {
    this.showPass = !this.showPass;
  }

}
