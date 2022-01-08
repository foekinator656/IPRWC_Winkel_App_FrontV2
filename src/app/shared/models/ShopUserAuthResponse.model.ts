import {ShopUser} from "./shop-user.model";

export class ShopUserAuthResponse{
  public jwt: string;
  public shopUser: ShopUser;

  constructor(jwt: string, shopUser: ShopUser) {
    this.jwt = jwt;
    this.shopUser = shopUser;
  }
}
