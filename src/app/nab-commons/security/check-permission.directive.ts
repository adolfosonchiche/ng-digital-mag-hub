import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { PermissionsService } from 'src/app/services/role/permission.service';
import { RolEnum } from 'src/global/roles-enum';

@Directive({
    selector: '[appCheckPermission]'
})
export class CheckPermissionDirective implements OnInit {

    @Input() appCheckPermission: number = RolEnum.NONE;
    @Input() checkMultiplePermissions: number[] = [];

    constructor(
        private elRef: ElementRef,
        private permissionsService: PermissionsService
    ) {
    }

    ngOnInit(): void {
        if (this.appCheckPermission == RolEnum.NONE && this.checkMultiplePermissions.length <= 0) {
            return;
        }

        if (this.appCheckPermission != RolEnum.NONE) {
            this.checkMultiplePermissions.push(this.appCheckPermission);
        }
        
        let result = false;
        result = this.permissionsService.verifyPermission(this.checkMultiplePermissions);
        if (!result) {
            this.elRef.nativeElement?.remove();
        }
    }
}
