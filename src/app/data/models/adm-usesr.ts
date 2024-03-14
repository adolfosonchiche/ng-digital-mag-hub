export class Category {
    public typologyId !: number;
    public cliOrganizationId !: number;
    public ownerOrganizationId !: number;
    public description !: string;
    public internalId !: number;
    public value1 !: string;
    public value2 !: string;
    public translatable !: boolean;
    public parentTypologyId !: number;
}


export class User {
    public userId !: number;
    public admPerson = new Person();
    public nickname !: string;
    public hashId !: string;
    public avatarImage !: string;
    public email1 !: string;
    public password !: string;
    public secretQuestion !: string;
    public secretAnswer !: string;
    public passUpdateDate !: string;
    public tpStatus !: Category;
    public recoveryToken!: string;
    public entryDate!: string;
    public userCreatorId!: number;

    //only for dto
    public memberType !: Category;
    public roles: Role[] = [];
    public role!: string;
    public internalId!: number;
    public passwordConfirm!: string;
}

export class Person {
    public personId !: number;
    public firstName !: string;
    public middleName !: string;
    public lastName !: string;
    public birthday !: string | Date;
    public profession !: string;
    public annotation !: string;
    public phoneNumber !: string;
    public fullName !: string;
}

export class Role {
    public roleId!: number;
    public hashId!: string;
    public name!: string;
    public description: string = '';
    public home!: string;
    public priority!: number;
    public internalId!: number;
    public tpStatus!: Category;
    public admRolePermissions: RolePermission[] = [];
    public entryDate!: string;
    public userId!: number;
}

export class UserRole {
    public userRoleId!: number;
    public userId!: number;
    public roleId!: number;
}

export class RolePermission {
    public rolePermissionId!: number | undefined;
    public createPermission: boolean = false;
    public deletePermission: boolean = false;
    public exportPermission: boolean = false;
    public readPermission: boolean = false;
    public updatePermission: boolean = false;
    public menuPermission: boolean = false;
}

export class PermissionDto {
    constructor(
        public permissionId: number,
        public internalId: number,
        public createPermission: boolean,
        public deletePermission: boolean,
        public exportPermission: boolean,
        public readPermission: boolean,
        public updatePermission: boolean,
        public menuPermission: boolean,
        public icon: string,
        public name: string,
        public sref: string,
        public priority: number,
        public parentPermissionId: number
    ) { }
    public notify!: string;
    public childrenPermissions!: PermissionDto[];
}