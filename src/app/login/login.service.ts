import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../shared/models/login.request";
import {ShopUser} from "../shared/models/shop-user.model";
import {ApiService} from "../shared/api.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public errorMessage!: string;
  private _shopUser!: ShopUser;
  private _userIsLoggedIn: boolean = false;
  public welcomeString: string = "";
  public userIsAdmin: boolean = false;
  delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  public adminRoles = ["SYS_ADMIN","DATA_ADMIN"];

  constructor(private http: HttpClient, private apiService: ApiService ) { }

  loginShopUser(loginRequest: LoginRequest){

    if (!this.userIsLoggedIn){
      this.http.post<ShopUser>(this.apiService.apiUrl+'shopuser/login',loginRequest)
        .subscribe(shopUser => {
            this.shopUser = shopUser;
            this.userIsLoggedIn = true;
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

  get shopUser(): ShopUser {
    return this._shopUser;
  }
  set shopUser(value: ShopUser) {
    this._shopUser = value;
  }
  get userIsLoggedIn(): boolean {
    return this._userIsLoggedIn;
  }

  set userIsLoggedIn(value: boolean) {
    this._userIsLoggedIn = value;
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

  registrationUser(registrationRequest: ShopUser) {
    if (!this.userIsLoggedIn) {

      this.http.post<ShopUser>(this.apiService.apiUrl + 'shopuser/register', registrationRequest)
        .subscribe(shopUser => {
            console.log(shopUser);
            this.shopUser = shopUser;
            this.userIsLoggedIn = true;
            this.makeWelcomeString();
            let currentShopUserRole = this.shopUser.shopUserRole.toString();
            console.log(currentShopUserRole)
            this.userIsAdmin = (this.adminRoles.indexOf(currentShopUserRole) > -1);
          }, error => {
            console.log(error);
            this.errorMessage = error;
          }
        );
    }
  }
}
