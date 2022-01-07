import {BikeOrderStatusEnum} from "./bike-order-status.enum";
import {ShopUser} from "./shop-user.model";

export class BikeOrder{
  public bikeOrderId: any;
  public bikeOrderStatus: BikeOrderStatusEnum;
  public shopUser: ShopUser;


  constructor(bikeOrderId: any, bikeOrderStatus: BikeOrderStatusEnum, shopUser: ShopUser) {
    this.bikeOrderId = bikeOrderId;
    this.bikeOrderStatus = bikeOrderStatus;
    this.shopUser = shopUser;
  }
}
