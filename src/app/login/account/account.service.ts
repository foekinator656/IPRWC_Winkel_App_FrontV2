import { Injectable } from '@angular/core';
import {ShopUser} from "../../shared/models/shop-user.model";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../shared/api.service";
import {LoginService} from "../login.service";
import {ShopUserAuth} from "../../shared/models/shop-user-auth.model";
import {AuthService} from "../../shared/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // public shopUserAuth = new ShopUserAuth(this.authService.jwt, this.authService.shopUser);
  public errorMessage!: string;
  changeAddressMode: boolean = false;
  delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  accountViewUser!: ShopUser;
  constructor(private http: HttpClient, private apiService: ApiService,public authService: AuthService) { }

  async changeAddress(street: string, houseNr: string, postalCode:string, city: string) {
    if (this.changeAddressMode) {
      let paramsString: string = "?newStreet=" + street;
      paramsString += "&newHouseNr=" + houseNr;
      paramsString += "&newPostalCode=" + postalCode;
      paramsString += "&newCity=" + city;
      // console.log(this.shopUserAuth);

      let shopUserId = this.authService.authenticatedUser.shopUser.shopUserId;
      this.http.put<ShopUser>(this.apiService.apiUrl + 'shopuser/update/'+shopUserId+paramsString, this.authService.authenticatedUser)
        .subscribe(shopUser => {
          console.log(shopUser);
          this.accountViewUser = shopUser;
          this.changeAddressMode = false;
          }, error => {
            console.log(error);
            this.errorMessage = error;
          }
        );
      while (this.changeAddressMode) {
        await this.delay(1000);
      }
    }
  }

  getShopUserEmail() {
    return atob(this.accountViewUser.shopUserEmail);
  }
}
