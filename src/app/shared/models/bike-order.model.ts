import {BikeOrderStatusEnum} from "./bike-order-status.enum";
import {ShopUser} from "./shop-user.model";

export class BikeOrder{
  private _bikeOrderId: any;
  private _bikeOrderStatus: BikeOrderStatusEnum;
  private _shopUser: ShopUser;


  constructor(bikeOrderStatus: BikeOrderStatusEnum, shopUser: ShopUser) {
    // this._bikeOrderId = bikeOrderId;
    this._bikeOrderStatus = bikeOrderStatus;
    this._shopUser = shopUser;

  }

  get bikeOrderId(): number {
    return this._bikeOrderId;
  }

  set bikeOrderId(value: number) {
    this._bikeOrderId = value;
  }

  get shopUser(): ShopUser {
    return this._shopUser;
  }

  set shopUser(value: ShopUser) {
    this._shopUser = value;
  }

  get bikeOrderStatus(): BikeOrderStatusEnum {
    return this._bikeOrderStatus;
  }

  set bikeOrderStatus(value: BikeOrderStatusEnum) {
    this._bikeOrderStatus = value;
  }
}
