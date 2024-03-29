import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/other/amd-user/user.service";
import {ToasterService} from "../../../../services/other/toaster/toaster.service";
import {NewUserDto, UserDto} from "../../../../data/models/model";

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.scss']
})
export class UserCrudComponent implements OnInit {

  newUserDto:NewUserDto;
  photoLoaded:boolean = true;
  userId:number;

  constructor(
    private userService:UserService,
    private toasterService:ToasterService,
  ) {
  }

  ngOnInit(): void {
    this.newUserDto = new NewUserDto();
    this.userService.getMe().subscribe({
      next: (dto) => {
        this.userId = dto.userId;
        this.newUserDto.firstName = dto.firstName;
        this.newUserDto.middleName = dto.middleName;
        this.newUserDto.lastName = dto.lastName;
        this.newUserDto.birthday = dto.birthday;
        this.newUserDto.description = dto.description;
        this.newUserDto.profilePhoto = dto.profilePhoto;
      },
      error: _ => this.toasterService.showDefaultError()
    })
  }

  loadFile(event:any){
    this.photoLoaded = false;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let base64 = reader.result;
        if (base64) {
          this.newUserDto.profilePhoto = base64 + '';
          this.photoLoaded = true;
        }
      }
    } else {
      this.newUserDto.profilePhoto = undefined;
      this.photoLoaded = true;
    }
  }

  save(){
    this.userService.update(this.newUserDto, this.userId).subscribe({
      next: (dto) => this.toasterService.showSuccess("Datos actualizados.", "Éxito"),
      error: _ => this.toasterService.showDefaultError()
    });
  }

}
