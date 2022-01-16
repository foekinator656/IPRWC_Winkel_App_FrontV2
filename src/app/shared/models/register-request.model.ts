import {ShopUser} from "./shop-user.model";
import {ShopUserAuth} from "./shop-user-auth.model";

export class RegisterRequest{
  public shopUser!: ShopUser;
  public shopUserAuth!: ShopUserAuth;


  constructor(shopUser: ShopUser, shopUserAuth: ShopUserAuth) {
    this.shopUser = shopUser;
    this.shopUserAuth = shopUserAuth;
  }
}
