import {ShopUserAuth} from "./shop-user-auth.model";

export class LoginRequest {
  public email: string;
  public password: string;
  public checkShopUserAuth!: ShopUserAuth;
  constructor(email: string, password: string,checkShopUserAuth: ShopUserAuth) {
    this.email = email;
    this.password = password;
    this.checkShopUserAuth = checkShopUserAuth;
  }
}
