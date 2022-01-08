import { Injectable } from '@angular/core';
import {ShopUser} from "../../shared/models/shop-user.model";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../shared/api.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public errorMessage!: string;
  accountViewUser!: ShopUser;
  validAccountView: boolean = false;
  changeAddressMode: boolean = false;
  delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  constructor(private http: HttpClient, private apiService: ApiService ) { }

  async changeAddress(street: string, houseNr: string, postalCode:string, city: string) {
    if (this.changeAddressMode) {
      let paramsString: string = "?newStreet=" + street;
      paramsString += "&newHouseNr=" + houseNr;
      paramsString += "&newPostalCode=" + postalCode;
      paramsString += "&newCity=" + city;

      console.log(paramsString);
      console.log(this.accountViewUser.shopUserId);


      this.http.put<ShopUser>(this.apiService.apiUrl + 'shopuser/update/'+this.accountViewUser.shopUserId+paramsString, "")
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
