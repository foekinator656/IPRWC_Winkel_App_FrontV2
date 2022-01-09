import { Injectable } from '@angular/core';
import {BikeOrder} from "../../shared/models/bike-order.model";
import {Bike} from "../../shared/models/bike.model";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../shared/api.service";
import {AuthService} from "../../shared/auth.service";

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

  constructor(private http: HttpClient,private apiService: ApiService,private authService: AuthService) { }


  async fetchBikeOrders() {
    let bikeOrdersReceived = false;
    this.http.post<BikeOrder[]>(this.apiService.apiUrl+'bikeorder',this.authService.authenticatedUser)
      .subscribe(bikeOrders => {
        this.bikeOrders = [];
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
    this.http.get<Bike[]>(this.apiService.apiUrl+'bike/bikeOrder/'+bikeOrder.orderId)
      .subscribe(bikesAPI => {
        this.bikes = bikesAPI;
        bikesReceived = true;
      }, error => {
        console.log(error);
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

  getAllBikes(){
    this.http.get<Bike[]>(this.apiService.apiUrl+'bike')
    .subscribe(bikes => {
      this.bikes = bikes.slice();
      return bikes;
    }, error => {
      console.log(error);
      this.errorMessage = error;
    });
  }
}
