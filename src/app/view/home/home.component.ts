import { Component } from '@angular/core';
import { LayoutControlService } from 'src/app/nab-commons/services/layout-control.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private layoutControlService: LayoutControlService
  ) {
    this.layoutControlService.hideNavbar();
  }


  version: '1.0.0'

}
