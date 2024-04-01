import {Component, OnInit} from '@angular/core';
import {ToasterService} from "../../../../services/other/toaster/toaster.service";
import {MagazineService} from "../../../../services/other/magazine/magazine.service";
import {MagazineDto, NewMagazineRateDto, NewSubscriptionDto, UserDto} from "../../../../data/models/model";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../services/other/amd-user/user.service";
import {SubscriptionService} from "../../../../services/other/magazine/subscription.service";
import {RateService} from "../../../../services/other/magazine/rate.service";

@Component({
  selector: 'app-magazine-subscription',
  templateUrl: './magazine-subscription.component.html',
  styleUrls: ['./magazine-subscription.component.scss']
})
export class MagazineSubscriptionComponent implements OnInit {

  magazineId:number;
  magazine:MagazineDto;
  me:UserDto;
  newSubscription:NewSubscriptionDto = new NewSubscriptionDto();
  subscribed:boolean = false;
  rate:number;
  rateText:string = "";
  rateIcon:string = "";
  rateTextMap:Map<number, string> = new Map<number, string>()
    .set(1, 'Muy malo')
    .set(2, 'Malo')
    .set(3, 'Regular')
    .set(4, 'Bueno')
    .set(5, 'Muy bueno')
  ;
  rateIconMap:Map<number, string> = new Map<number, string>()
    .set(1, 'keyboard_double_arrow_down')
    .set(2, 'keyboard_arrow_down')
    .set(3, 'equal')
    .set(4, 'keyboard_arrow_up')
    .set(5, 'keyboard_double_arrow_up')
  ;

  constructor(
    private toasterService:ToasterService,
    private magazineService:MagazineService,
    private activatedRoute:ActivatedRoute,
    private userService:UserService,
    private subscriptionService:SubscriptionService,
    private rateService:RateService,
    private router:Router,
  ) {
  }

  ngOnInit(): void {
    this.magazineId = Number(this.activatedRoute.snapshot.params['magazineId'] ?? 0);
    this.magazineService.findById(this.magazineId).subscribe({
      next: (dto) => this.magazine = dto,
      error: _ => this.toasterService.showDefaultError()
    });
    this.userService.getMe().subscribe({
      next: (dto) => this.me = dto,
      error: _ => this.toasterService.showDefaultError()
    });
    this.updateSubscriptionStatus();
  }

  subscribe(){
    this.checkAllIsValid().then((allIsValid) => {
      if (allIsValid) {
        this.newSubscription.magazineId = this.magazineId;
        this.subscriptionService.create(this.newSubscription).subscribe({
          next: () => {
            this.toasterService.showSuccess("Ahora estás suscrito a esta revista.", "Éxito");
            this.updateSubscriptionStatus();
          },
          error: _ => this.toasterService.showError("Saldo insuficiente para realizar la operación", "Error")
        });
      } else {
        this.toasterService.showError("Complete todos los campos", "Error");
      }
    });
  }

  updateSubscriptionStatus(){
    this.subscriptionService.subscribedTo(this.magazineId).subscribe({
      next: (status) => {
        this.subscribed = status;
        this.updateRate();
      },
      error: _ => this.toasterService.showDefaultError()
    });
  }

  updateRate(){
    if (this.subscribed) {
      this.rateService.find(this.magazineId).subscribe({
        next: (dto) => {
          this.rate = dto.rate
          this.rateText = this.rateTextMap.get(this.rate);
          this.rateIcon = this.rateIconMap.get(this.rate);
        },
        error: _ => this.rate = 0
      });
    } else {
      this.rate = 0
    }
  }

  onRateChange(){
    let newRate = new NewMagazineRateDto();
    newRate.magazineId = this.magazineId;
    newRate.rate = this.rate;
    this.rateService.create(newRate).subscribe({
      next: () => {
        this.toasterService.showSuccess("Calificación actualizada", "Éxito");
        this.updateRate();
      },
      error: _ => this.toasterService.showDefaultError()
    });
  }

  goToViewMagazine(){
    void this.router.navigate(['/digital/magazines/subscription/' + this.magazineId + '/view'])
  }

  checkAllIsValid():Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      resolve(
        this.newSubscription.entryDate != undefined
      );
    });
  }

}
