import {ShopUser} from "./shop-user.model";

export class ShopUserAuth {
  public jwt: string;
  public shopUserEmail: string;

  constructor(jwt: string, shopUserEmail: string) {
    this.jwt = jwt;
    this.shopUserEmail = shopUserEmail;
  }
}
