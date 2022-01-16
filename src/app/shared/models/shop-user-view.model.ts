import {ShopUserRole} from "./shop-user-role.enum";

export class ShopUserView{
  public shopUserId: number;
  public shopUserEmail: string;
  public shopUserRole: ShopUserRole;
  public yearOfBirth: number;
  public monthOfBirth: number;
  public dayOfBirth: number;
  public firstName: string;
  public middleName: string;
  public lastName: string;
  public street: string;
  public houseNr: string;
  public postalCode: string;
  public city: string;


  constructor(shopUserId: number, shopUserEmail: string, shopUserRole: ShopUserRole, yearOfBirth: number, monthOfBirth: number, dayOfBirth: number, firstName: string, middleName: string, lastName: string, street: string, houseNr: string, postalCode: string, city: string) {
    this.shopUserId = shopUserId;
    this.shopUserEmail = shopUserEmail;
    this.shopUserRole = shopUserRole;
    this.yearOfBirth = yearOfBirth;
    this.monthOfBirth = monthOfBirth;
    this.dayOfBirth = dayOfBirth;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.street = street;
    this.houseNr = houseNr;
    this.postalCode = postalCode;
    this.city = city;
  }
}
