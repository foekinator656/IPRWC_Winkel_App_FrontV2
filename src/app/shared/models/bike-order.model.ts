import {BikeOrderStatusEnum} from "./bike-order-status.enum";
import {ShopUser} from "./shop-user.model";

export class BikeOrder{
  public orderId: any;
  public bikeOrderStatus: BikeOrderStatusEnum;
  public shopUserId: number;


  constructor(bikeOrderId: any, bikeOrderStatus: BikeOrderStatusEnum, shopUserId: number) {
    this.orderId = bikeOrderId;
    this.bikeOrderStatus = bikeOrderStatus;
    this.shopUserId = shopUserId;
  }
}
