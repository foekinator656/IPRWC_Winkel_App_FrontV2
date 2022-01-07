import { ShopUserRole } from "./shop-user-role.enum";


export class ShopUser {
  private _shopUserId!: any;
  private _shopUserEmail: string;
  private _password: string;
  private _shopUserRole: ShopUserRole;
  private _yearOfBirth: number;
  private _monthOfBirth: number;
  private _dayOfBirth: number;
  private _firstName: string;
  private _middleName: string;
  private _lastName: string;
  private _street: string;
  private _houseNr: string;
  private _postalCode: string;
  private _city: string;


  constructor(shopUserId: any,shopUserEmail: string,
               password: string,shopUserRole: ShopUserRole,
              yearOfBirth: number, monthOfBirth: number,
              dayOfBirth: number, firstName: string,
              middleName: string, lastName: string,
              street: string, houseNr: string,
              postalCode: string, city: string) {
    this._shopUserId! = shopUserId;
    this._shopUserEmail = shopUserEmail;
    this._shopUserRole = shopUserRole;
    this._password = password;
    this._yearOfBirth = yearOfBirth;
    this._monthOfBirth = monthOfBirth;
    this._dayOfBirth = dayOfBirth;
    this._firstName = firstName;
    this._middleName = middleName;
    this._lastName = lastName;
    this._street = street;
    this._houseNr = houseNr;
    this._postalCode = postalCode;
    this._city = city;
  }


  get shopUserId(): number {
    return this._shopUserId;
  }

  get shopUserEmail(): string {
    return this._shopUserEmail;
  }

  get shopUserRole(): ShopUserRole {
    return this._shopUserRole;
  }

  get password(): string {
    return this._password;
  }

  get yearOfBirth(): number {
    return this._yearOfBirth;
  }

  get monthOfBirth(): number {
    return this._monthOfBirth;
  }

  get dayOfBirth(): number {
    return this._dayOfBirth;
  }

  get firstName(): string {
    return this._firstName;
  }

  get middleName(): string {
    return this._middleName;
  }

  get lastNam(): string {
    return this._lastName;
  }

  get street(): string {
    return this._street;
  }

  get houseNr(): string {
    return this._houseNr;
  }

  get postalCode(): string {
    return this._postalCode;
  }

  get city(): string {
    return this._city;
  }
}
