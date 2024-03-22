import { Component, OnInit } from '@angular/core';
import { LayoutControlService } from '../../services/layout-control.service';
import { CurrentUserService } from 'src/app/services/auth/current-user.service';
import { UserDto } from 'src/app/data/models/model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUser!: UserDto;
  sumaryRole = '';
  constructor(
    private layoutControlService: LayoutControlService,
    private currentUserService: CurrentUserService,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.currentUserService.getMe();
    if(!this.currentUser) {
      this.currentUser = new UserDto();
      this.currentUser.fullName = "Usuario no encontrado"
    }

    const role = this.currentUserService.getMyRole();
    if(role) {
      const roles = role.split(',');
      let roleList = [];
      roles.forEach(element => {
        if(element == 100) {
          roleList.push('Administrador');
        } else if(element == 101) {
          roleList.push('Editor');
        } else if(element == 102) {
          roleList.push('Suscriptor');
        }
      });
      this.sumaryRole = roleList.join(' , ');
    } else {
      this.sumaryRole = 'No tienes rol';
    }
  }
}
