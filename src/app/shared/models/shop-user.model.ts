import { ShopUserRole } from "./shop-user-role.enum";


export class ShopUser {
  public shopUserId!: any;
  public shopUserEmail: string;
  public password: string;
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


  constructor(shopUserId: any,shopUserEmail: string,
              password: string,shopUserRole: ShopUserRole,
              yearOfBirth: number, monthOfBirth: number,
              dayOfBirth: number, firstName: string,
              middleName: string, lastName: string,
              street: string, houseNr: string,
              postalCode: string, city: string) {
    this.shopUserId! = shopUserId;
    this.shopUserEmail = shopUserEmail;
    this.shopUserRole = shopUserRole;
    this.password = password;
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
