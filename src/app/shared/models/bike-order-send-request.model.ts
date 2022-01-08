import {ShopUserAuth} from "./shop-user-auth.model";

export class BikeOrderSendRequest{
  public bikeModelIds: number[];
  public shopUserAuth: ShopUserAuth;

  constructor(bikeModelIds: number[], shopUserAuth: ShopUserAuth) {
    this.bikeModelIds = bikeModelIds;
    this.shopUserAuth = shopUserAuth;
  }
}
