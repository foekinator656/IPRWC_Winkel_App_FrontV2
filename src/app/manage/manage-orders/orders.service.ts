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


  fetchBikeOrders() {
    this.http.get<BikeOrder[]>(this.apiService.apiUrl+'bikeorder')
      .subscribe(bikeOrders => {
        console.log(bikeOrders);
        this.bikeOrders = bikeOrders.slice();
        console.log(this.bikeOrders);
        return bikeOrders;
      }, error => {
        console.log(error);
        this.errorMessage = error;
      });
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
