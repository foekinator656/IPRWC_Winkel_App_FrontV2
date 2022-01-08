import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../shared/models/login.request";
import {ShopUser} from "../shared/models/shop-user.model";
import {ApiService} from "../shared/api.service";
import {Router} from "@angular/router";
import {AccountService} from "./account/account.service";
import {ShopUserAuth} from "../shared/models/ShopUserAuth.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public jwt: string = "";
  public errorMessage!: string;
  public shopUser!: ShopUser;
  public userIsLoggedIn: boolean = false;
  public welcomeString: string = "";
  public userIsAdmin: boolean = false;
  delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  public adminRoles = ["SYS_ADMIN","DATA_ADMIN"];

  constructor(private http: HttpClient, private apiService: ApiService,public router: Router, public accountService: AccountService ) { }

  loginShopUser(loginRequest: LoginRequest){

    if (!this.userIsLoggedIn){
      this.http.post<ShopUserAuth>(this.apiService.apiUrl+'shopuser/login',loginRequest)
        .subscribe(ShopUserAuth => {
            this.shopUser = ShopUserAuth.shopUser;
            this.jwt = ShopUserAuth.jwt;
            this.userIsLoggedIn = true;
            console.log(ShopUserAuth);
            this.makeWelcomeString();
            let currentShopUserRole = this.shopUser.shopUserRole.toString();
            this.userIsAdmin = ( this.adminRoles.indexOf(currentShopUserRole) > -1);
          },error => {
            console.log(error);
            this.errorMessage = error;
          }
        );
    }
  }

  makeWelcomeString() {
    if (this.userIsLoggedIn){
      if (this.userIsAdmin){
        this.welcomeString = "Welkom Beheerder " + this.shopUser.firstName;
      } else {
        this.welcomeString = "Welkom Klant " + this.shopUser.firstName;
      }
    } else {
      this.welcomeString = "Welkom Gast";
    }
  }

  logOutShopUser() {
    this.userIsLoggedIn = false;
    this.makeWelcomeString();
    this.userIsAdmin = false;
  }

  async registrationUser(registrationRequest: ShopUser) {
    let newShopUserSaved = false;
    if (!this.userIsLoggedIn) {
      console.log("voor de post" + registrationRequest);
      this.http.post<ShopUserAuth>(this.apiService.apiUrl + 'shopuser/register', registrationRequest)
        .subscribe(ShopUserAuth => {
          this.shopUser = ShopUserAuth.shopUser;
          this.jwt = ShopUserAuth.jwt;
          this.accountService.accountViewUser = this.shopUser;
          this.userIsLoggedIn = true;
          newShopUserSaved = true;
          console.log(" newShopUserSaved wordt gezet " + newShopUserSaved);
          this.makeWelcomeString();
          let currentShopUserRole = this.shopUser.shopUserRole.toString();
          this.userIsAdmin = (this.adminRoles.indexOf(currentShopUserRole) > -1);
        }, error => {
          console.log(error);
          this.errorMessage = error;
        }
      );
    }
    while (!newShopUserSaved){
      await this.delay(100);
    }
    this.userIsLoggedIn = true;
    this.router.navigate(['/','account']);
  }
}
