import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../shared/models/login.request";
import {ShopUser} from "../shared/models/shop-user.model";
import {ApiService} from "../shared/api.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public errorMessage: string = "ikeb hier";
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
            console.log(shopUser);
            this.shopUser = shopUser;
            this.userIsLoggedIn = true;
            this.makeWelcomeString();
            let currentShopUserRole = this.shopUser.shopUserRole.toString();

            console.log(currentShopUserRole)

            this.userIsAdmin = ( this.adminRoles.indexOf(currentShopUserRole) > -1);
            console.log(this.shopUser.shopUserRole.toString())
            console.log(this.userIsAdmin);
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
    console.log(this.shopUser);
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
    console.log(" XXXXX in registrationUser" +  this.userIsLoggedIn);
    if (!this.userIsLoggedIn) {
      let paramString = "?emailReg=" + registrationRequest.shopUserEmail+"\"";
      paramString += "&passwordReg=" + registrationRequest.password+"\"";
      paramString += "&dobYear=" + registrationRequest.yearOfBirth+"\"";
      paramString += "&dobMonth=" + registrationRequest.monthOfBirth+"\"";
      paramString += "&dobDay=" + registrationRequest.dayOfBirth+"\"";
      paramString += "&firstNameReg=" + registrationRequest.firstName+"\"";
      paramString += "&middleNameReg=" + registrationRequest.middleName+"\"";
      paramString += "&lastNameReg=" + registrationRequest.lastNam+"\"";
      paramString += "&streetReg=" + registrationRequest.street+"\"";
      paramString += "&houseNrReg=" + registrationRequest.houseNr+"\"";
      paramString += "&postalcodeReg=" + registrationRequest.postalCode+"\"";
      paramString += "&cityReg=" + registrationRequest.city+"\"";
      console.log(paramString);






      this.http.post<ShopUser>(this.apiService.apiUrl + 'shopuser/register' + paramString, registrationRequest)
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
