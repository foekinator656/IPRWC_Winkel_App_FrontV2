import { Injectable } from '@angular/core';
import {BikeOrder} from "../../shared/models/bike-order.model";
import {Bike} from "../../shared/models/bike.model";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../shared/api.service";
import {AuthService} from "../../shared/auth.service";

@Injectable({
  providedIn: 'root'
})
export class OrderReportingService {

  bikes: Bike[] = [];
  bikeOrders!: BikeOrder[];
  bikeOrderPrices: number[] = [];
  errorMessage!: string;
  delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  constructor(private http: HttpClient,private apiService: ApiService,private authService: AuthService) { }


  async fetchBikeOrders() {
    let bikeOrdersReceived = false;
    this.http.post<BikeOrder[]>(this.apiService.apiUrl+'bikeOrder',this.authService.authenticatedUser)
      .subscribe(bikeOrders => {
        this.bikeOrders = [];
        this.bikeOrders = bikeOrders.slice();
        bikeOrdersReceived = true;
        return bikeOrders;
      }, error => {
        this.errorMessage = error;
      });
    while (!bikeOrdersReceived) {
         await this.delay(10);
    }
    for (let bikeOrder of this.bikeOrders) {
      this.bikeOrderPrices.push(await this.getPriceForOrder(bikeOrder));
    }
  }

  async getPriceForOrder(bikeOrder: BikeOrder){
    let bikesReceived = false;
    let totalprice: number = 0;
    this.http.post<Bike[]>(this.apiService.apiUrl+'bike/bikeOrder/'+bikeOrder.orderId,this.authService.authenticatedUser)
      .subscribe(bikesAPI => {
        this.bikes = bikesAPI;
        bikesReceived = true;
      }, error => {
        this.errorMessage = error;
      });
    while (!bikesReceived) {
      await this.delay(10);
    }
    for (let bike of this.bikes){
      totalprice += bike.price;
    }
    return totalprice;
  }

  deleteBikeOrder(orderId: number) {
    this.http.post<BikeOrder>(this.apiService.apiUrl+'bikeOrder/delete/'+orderId,this.authService.authenticatedUser)
      .subscribe(deletedBikeOrder => {
      }, error => {
        this.errorMessage = error;
      })
  }
}
