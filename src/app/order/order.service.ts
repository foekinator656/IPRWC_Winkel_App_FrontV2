import { Injectable } from '@angular/core';
import {Bike} from "../shared/models/bike.model";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../shared/api.service";
import {BikeModel} from "../shared/models/bike-model.model";
import {LoginService} from "../login/login.service";
import {AuthService} from "../shared/auth.service";
import {BikeOrderSendRequest} from "../shared/models/bike-order-send-request.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  bikesInCart: Bike[] = [];
  totalOrderPrice: number = 0;
  responseBikeOrderId!: number;
  sendSuccess: boolean = false;

  delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  public errorMessage!: string;

  constructor(private http: HttpClient,private apiService: ApiService, public authService: AuthService) { }


  addBikeModelToCart(bikeModelId: number) {
    this.http.get<BikeModel>(this.apiService.apiUrl+'bikemodel/'+bikeModelId)
      .subscribe(bikeModel => {
        console.log(bikeModel);
        let bike = new Bike(bikeModel.bikeModelName, bikeModel, bikeModel.priceOfTheDay, true, false);
        this.bikesInCart.push(bike);
        this.totalOrderPrice += bike.price;
      });
  }


  deleteBikeFormCart(bikeIndex: number) {
    let bike  = this.bikesInCart[bikeIndex];
    this.bikesInCart.splice(bikeIndex, 1);
    this.totalOrderPrice += - bike.price;
  }

  async sendOrder() {
    let bikeModelIds: number[] = [];
    for (let i = 0; i < this.bikesInCart.length; i++) {
      bikeModelIds.push(this.bikesInCart[i].bikeModel.bikeModelId);
    }
    let sendOrderRequest = new BikeOrderSendRequest(bikeModelIds, this.authService.authenticatedUser);
    let shopUserId: number = this.authService.authenticatedUser.shopUser.shopUserId;
    this.http.post<number>(this.apiService.apiUrl+'bikeorder/'+shopUserId,sendOrderRequest)
      .subscribe(response => {
        this.responseBikeOrderId = response;
        this.sendSuccess = true;
      },(error => {
        console.log(error)
        this.errorMessage = error;
      }));
    while (this.responseBikeOrderId === undefined){
      await this.delay(1000);
    }
    this.bikesInCart = [];
    this.totalOrderPrice = 0;
    return  this.responseBikeOrderId;
  }
}
