import { Injectable } from '@angular/core';
import {ShopUser} from "../../shared/models/shop-user.model";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../shared/api.service";
import {AuthService} from "../../shared/auth.service";
import {ShopUserView} from "../../shared/models/shop-user-view.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // public shopUserAuth = new ShopUserAuth(this.authService.jwt, this.authService.shopUser);
  public errorMessage!: string;
  changeAddressMode: boolean = false;

  accountViewUser!: ShopUserView;

  delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  constructor(private http: HttpClient,
              private apiService: ApiService,public authService: AuthService) { }

  async changeAddress(street: string, houseNr: string, postalCode:string, city: string) {
    if (this.changeAddressMode) {
      let paramsString: string = "?newStreet=" + street;
      paramsString += "&newHouseNr=" + houseNr;
      paramsString += "&newPostalCode=" + postalCode;
      paramsString += "&newCity=" + city;

      await this.getShopUserViewByEmail(this.authService.authenticatedUser.shopUserEmail);
      let shopUserView = this.accountViewUser;
      let shopUserId = shopUserView.shopUserId;

      this.http.post<ShopUserView>(this.apiService.apiUrl + 'shopUser/update/'+shopUserId+paramsString, this.authService.authenticatedUser)
        .subscribe(shopUserView => {
          this.accountViewUser = shopUserView;
          this.authService.authenticatedUserView = shopUserView;
          console.log(shopUserView);
          this.changeAddressMode = false;
          }, error => {
            this.errorMessage = error;
          }
        );
      while (this.changeAddressMode) {
        await this.delay(1000);
      }
    }
  }

  async getShopUserViewByEmail(shopUserEmail: string) {
    let shopUserViewReceived = false;
    this.http.post<ShopUserView>(this.apiService.apiUrl + 'shopUser/mail/'+shopUserEmail, this.authService.authenticatedUser)
      .subscribe(shopUserView => {
          this.accountViewUser = shopUserView;
          this.authService.authenticatedUserView = this.accountViewUser;
        this.authService.authenticatedUserView = shopUserView;
          shopUserViewReceived = true;
          this.changeAddressMode = false;
        }, error => {
          this.errorMessage = error;
        }
      );
    while (!shopUserViewReceived) {
        await this.delay(100);
    }
  }

  getShopUserEmail(){
    return atob(this.accountViewUser.shopUserEmail);
  }


}
