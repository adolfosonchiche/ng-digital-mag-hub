import {Component, OnInit} from '@angular/core';
import {ToasterService} from "../../../../services/other/toaster/toaster.service";
import {MagazineService} from "../../../../services/other/magazine/magazine.service";
import {MagazineCommentDto, MagazineDto, MagazineLikeDto, MagazineLikeRequest, NewMagazineRateDto, NewSubscriptionDto, UserDto} from "../../../../data/models/model";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../services/other/amd-user/user.service";
import {SubscriptionService} from "../../../../services/other/magazine/subscription.service";
import {RateService} from "../../../../services/other/magazine/rate.service";
import { MagazineLikeService } from 'src/app/services/other/magazine/magazine-like.service';
import { CategoryEnum } from 'src/global/category-enum';
import { MagazineCommentService } from 'src/app/services/other/magazine/magazine-comment.service';

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
  isLiked: boolean = false;
  categoryEnums = CategoryEnum;
  commentsList : MagazineCommentDto[] = [];

  constructor(
    private toasterService:ToasterService,
    private magazineService:MagazineService,
    private activatedRoute:ActivatedRoute,
    private userService:UserService,
    private subscriptionService:SubscriptionService,
    private rateService:RateService,
    private router:Router,
    private magazineLikeService : MagazineLikeService,
    private magazineCommentService: MagazineCommentService
  ) {
  }

  ngOnInit(): void {
    this.magazineId = Number(this.activatedRoute.snapshot.params['magazineId'] ?? 0);
    this.getIsLike(this.magazineId);
    this.getComments(this.magazineId);
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

  downloadMagazine() {
    this.magazineService.findViewById(this.magazine.magazineId).subscribe({
      next: (dto) => {
        const byteCharacters = atob(dto.file);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${this.magazine.name}.pdf`;

        link.click();
      },
      error: _ => console.log('error al obtener el archivo')
    });

  }

  magazineLike() {
    console.log(this.magazine)
    let newLike = new MagazineLikeRequest();
    newLike.magazineId = this.magazineId;
    newLike.like = ! this.isLiked;
    this.magazineLikeService.magazineLike(newLike).subscribe({
      next: () => {
        this.isLiked = ! this.isLiked;
      }, error: err => this.toasterService.showDefaultError()
    });
  }

  getIsLike(magazineId: number) {
    this.magazineLikeService.isMagazineLike(magazineId).subscribe({
      next: () => {
        this.isLiked = true;
      }, error: err => console.log(err)
    });
  }

  checkAllIsValid():Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      resolve(
        this.newSubscription.entryDate != undefined
      );
    });
  }

  getComments(magazineId: number) {
    this.magazineCommentService.getMagazineCommentList(magazineId).subscribe({
      next: (coments) => {
        this.commentsList = coments;
      },
      error: err => {
        console.log(err)
      }
    });
  }

}
