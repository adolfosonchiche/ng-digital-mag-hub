export class Category {
    public categoryId !: number;
    public description !: string;
    public value1 !: string;
    public value2 !: string;
    public parentCategoryId !: number;
}

export class CategoryDto {
  public categoryId !: number;
  public description !: string;
  public value1 !: string;
  public value2 !: string;
}

export class NewMagazineDto {
  public name:string;
  public description:string;
  public catCategory:CategoryDto;
  public file:string;
  public entryDate:string;
  public subscriptionCost:number;
  public cover:string;
}

export class MagazineDto {
  public magazineId:number;
  public name:string;
  public description:string;
  public catCategory:CategoryDto;
  public userId:number;
  public file:string;
  public entryDate:string;
  public catStatus:CategoryDto;
  public author:UserDto;
  public costPerDay:number;
  public subscriptionCost:number;
  public cover:string;
  public catReactionStatus!: CategoryDto;
  public catSubscriptionStatus!: CategoryDto;
}

export class UpdateCostMagazineDto{
  public magazineId:number;
  public name:string;
  public cost:number;
}

export class MagazineReactionStatusDto {
    public magazineId:number;
    public status:number;
    constructor(magazineId, status) {
        this.magazineId = magazineId;
        this.status = status;
    }
}


export class User {
    public userId !: number;
    public firstName !: string;
    public middleName !: string;
    public lastName !: string;
    public birthday !: string | Date;
    //public avatarImage !: string;
    public email !: string;
    public password !: string;
    public tpStatus !: Category;
    public entryDate!: string;
    public roles: Role[] = [];
}

export class UserDto {
    public userId!: number;
    public fullName!:string;
    public email!: string;
    public wallet:number;
}


export class Role {
    public roleId!: number;
    public name!: string;
    public description: string = '';
    constructor(roleId, name, description) {
        this.roleId = roleId;
        this.name = name;
        this.description = description;
    }
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

export class Token {
    constructor(
        public jwt: string
    ) { }
}

export class NewSubscriptionDto {
  magazineId:number;
  entryDate:string;
}
