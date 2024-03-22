import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LayoutControlService } from './nab-commons/services/layout-control.service';
import { CurrentUserService } from './services/auth/current-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showNavbar = false;
  constructor(
    private layoutControlService: LayoutControlService,
    private currentUser: CurrentUserService,
  ) {}

  ngOnInit(): void {
    this.showNavbar = this.currentUser.isAuthenticated();
    if(this.showNavbar) {
      this.layoutControlService.showNavbar();   
    } else {
      this.layoutControlService.hideNavbar();
    }
  }

}
