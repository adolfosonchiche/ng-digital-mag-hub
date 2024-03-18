import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Role, User } from 'src/app/data/models/adm-usesr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/auth/user.service';
import { ToasterService } from 'src/app/services/other/toaster/toaster.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  user!: User;
  showPass = false;
  email$ = new Subject();
  userExist = false;

  availableRole: Role[] = [new Role(101, 'Editor', "rol de editor"), new Role(102, 'Suscriptor', "rol de suscriptor")]

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private toaster: ToasterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = new User();
    this.checkEmail();
  }

  register(): void {
    if (this.isValid()) {
      this.userService.save(this.user).subscribe({
        next: (user) => {
          console.log(user)
          this.authService.doLogin(user, { email: this.user.email, password: this.user.password });
        },
        error: _ => {
          this.toaster.showError("Error en el servidor, intente mas tarde");
        }
      });

    } else {
      this.toaster.showError('Debes de llenar todos los campos requeridos');
    }

  }

  isValid() {
    return (this.user.firstName && this.user.lastName && this.user.middleName && !this.userExist
      && this.user.birthday && this.user.password && this.user.email && this.user.roles.length > 0);
  }

  togglePass() {
    this.showPass = !this.showPass;
  }

  changesInProgress($event: any) {
    this.userExist = false;
    this.user.email = $event;
    //this.checkEmail();
  }

  private checkEmail() {
    this.email$.pipe(
      debounceTime(800),
      distinctUntilChanged()
    ).subscribe({
      next: () => {
        this.userService.checkEmail(this.user.email).subscribe(
          result => {
            console.log(result)
            this.userExist = result.status
          }
        );
      }
    });
  }


}
