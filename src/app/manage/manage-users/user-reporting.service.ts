import { Injectable } from '@angular/core';
import {Bike} from "../../shared/models/bike.model";
import {BikeOrder} from "../../shared/models/bike-order.model";
import {ShopUserView} from "../../shared/models/shop-user-view.model";
import {ApiService} from "../../shared/api.service";
import {AuthService} from "../../shared/auth.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserReportingService {

  shopUserViews!: ShopUserView[];
  errorMessage!: string;
  shopUserViewsReceived: boolean = false;

  delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  constructor(public apiService: ApiService,public authService: AuthService, public http: HttpClient) { }

  async fetchShopUserViews(){
    this.shopUserViews = [];

    this.http.post<ShopUserView[]>(this.apiService.apiUrl+'shopUser',this.authService.authenticatedUser)
      .subscribe(shopUserViews => {
        this.shopUserViews = shopUserViews;
        this.shopUserViewsReceived = true;
        return shopUserViews;
      }, error => {
        this.errorMessage = error;
      });
    while (!this.shopUserViewsReceived) {
      await this.delay(10);
    }
  }

  async deleteShopUser(shopUserIndex: number) {
    let shopUserView = this.shopUserViews[shopUserIndex];
    let shopUserId = shopUserView.shopUserId;

    let shopUserDeleted: boolean = false;
    this.http.post<ShopUserView>(this.apiService.apiUrl+'shopUser/delete/'+shopUserId,this.authService.authenticatedUser)
      .subscribe(deleteShopUser => {
        shopUserDeleted = true;
      }, error => {
        this.errorMessage = error;
      });
    while (!shopUserDeleted) {
      await this.delay(10);
    }
    await this.fetchShopUserViews();

  }
}
