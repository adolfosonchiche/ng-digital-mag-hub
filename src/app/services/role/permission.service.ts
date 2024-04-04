import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RolEnum } from 'src/global/roles-enum';
import { CurrentUserService } from '../auth/current-user.service';

const baseUrl = environment.digitalMagHubUrl + '/permissions';

@Injectable({
    providedIn: 'root'
})
export class PermissionsService {

    constructor(
        private http: HttpClient,
        private currentUserService: CurrentUserService,
    ) { }

    private getMyPermission(): number[] {
        const role = this.currentUserService.getMyRole();
        if (role) {
            const roles = role.split(',');
            let roleList: number[] = [];
            roles.forEach(element => {
                if (element == 100) {
                    roleList.push(RolEnum.ADMIN);
                } else if (element == 101) {
                    roleList.push(RolEnum.EDITOR);
                } else if (element == 102) {
                    roleList.push(RolEnum.SUBSCRIPTOR);
                }
            });
            return roleList;

        }
        return [];
    }

    verifyPermission(permissionType: RolEnum[]): boolean {
        const permission = this.getMyPermission();
        for (const numero of permission) {
            if (permissionType.includes(numero)) {
                return true;
            }
        }
        return false;
    }

}
