import { Injectable } from '@angular/core';
import {BikeOrder} from "../../shared/models/bike-order.model";
import {Bike} from "../../shared/models/bike.model";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../shared/api.service";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  getOrdersDone: boolean = false;
  bikes: Bike[] = [];
  bikeOrders!: BikeOrder[];
  bikeOrderPrices: number[] = [];
  errorMessage!: string;
  delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  constructor(private http: HttpClient,private apiService: ApiService) { }


  async fetchBikeOrders() {
    this.http.get<BikeOrder[]>(this.apiService.apiUrl+'bikeorder')
      .subscribe(bikeOrders => {
        this.bikeOrders = [];
        console.log(bikeOrders);
        this.bikeOrders = bikeOrders.slice();
        if (this.bikeOrders.length > 0 ){
          this.getOrdersDone = true;
        }
        console.log(this.bikeOrders);
        console.log(this.bikeOrders[0].orderId)
        return bikeOrders;
      }, error => {
        console.log(error);
        this.errorMessage = error;
      });
    while (!this.getOrdersDone) {
         await this.delay(1000);
    }

    for (let bikeOrder of this.bikeOrders) {
      this.bikeOrderPrices.push(await this.getPriceForOrder(bikeOrder));
    }
    console.log()
  }

  async getPriceForOrder(bikeOrder: BikeOrder){
    while (!this.getOrdersDone) {
      await this.delay(2000);
    }
    while (this.bikeOrders === undefined) {
      await this.delay(2000);
    }
    console.log("binnen getPriceForOrder");
    console.log("111 ********************" + bikeOrder);
    let orderId = bikeOrder.orderId;
    console.log("222 ********************" + bikeOrder.orderId);
    console.log(bikeOrder.orderId);
    console.log("333 ********************" + orderId);
    let bikesReceived = false;
    let totalprice: number = 0;
    this.http.get<Bike[]>(this.apiService.apiUrl+'bike/bikeOrder/'+bikeOrder.orderId)
      .subscribe(bikesAPI => {
        console.log(bikesAPI);
        this.bikes = bikesAPI;
        bikesReceived = true;
      }, error => {
        console.log(error);
        this.errorMessage = error;
      });
    while (!bikesReceived) {
      await this.delay(2000);
    }
    console.log(this.bikes);
    for (let bike of this.bikes){
      totalprice += bike.price;
    }
    return totalprice;
  }

  getAllBikes(){
    this.http.get<Bike[]>(this.apiService.apiUrl+'bike')
      .subscribe(bikes => {
        console.log(bikes);
        this.bikes = bikes.slice();
        console.log(this.bikeOrders);
        return bikes;
      }, error => {
        console.log(error);
        this.errorMessage = error;
      });
  }
}
