import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../shared/models/login.request";
import {ShopUser} from "../shared/models/shop-user.model";
import {ApiService} from "../shared/api.service";
import {Router} from "@angular/router";
import {AccountService} from "./account/account.service";
import {ShopUserAuth} from "../shared/models/shop-user-auth.model";
import {AuthService} from "../shared/auth.service";
import {ShopUserRole} from "../shared/models/shop-user-role.enum";
import {RegisterRequest} from "../shared/models/register-request.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public errorMessage!: string;
  public userIsLoggedIn: boolean = false;
  public welcomeString: string = "";
  public userIsAdmin: boolean = false;
  delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  public adminRoles = ["SYS_ADMIN","DATA_ADMIN"];

  constructor(private http: HttpClient, private apiService: ApiService,
              public router: Router, public authService: AuthService,
              public accountService: AccountService) { }

  async loginShopUser(loginRequest: LoginRequest){
    if (!this.userIsLoggedIn){

      this.http.post<ShopUserAuth>(this.apiService.apiUrl+'shopuser/login',loginRequest)
        .subscribe(shopUserAuth => {
            this.authService.authenticatedUser = shopUserAuth;
            this.userIsLoggedIn = true;
          },error => {
            console.log(error);
            this.errorMessage = error;
          }
        );
      while (!this.userIsLoggedIn){
        await this.delay(100);
      }

      await this.accountService.getShopUserViewByEmail(this.authService.authenticatedUser.shopUserEmail);
      this.authService.authenticatedUserView =  this.accountService.accountViewUser;
      let currentShopUserRole = this.authService.authenticatedUserView.shopUserRole.toString();
      this.userIsAdmin = ( this.adminRoles.indexOf(currentShopUserRole) > -1);
      this.makeWelcomeString();
      this.errorMessage = "";
    }
  }

  makeWelcomeString() {
    if (this.userIsLoggedIn){
      let shopUserFirstName = this.authService.authenticatedUserView.firstName;
      if (this.userIsAdmin){
        this.welcomeString = "Welkom Beheerder " + shopUserFirstName;
      } else {
        this.welcomeString = "Welkom Klant " + shopUserFirstName;
      }
    } else {
      this.welcomeString = "Welkom Gast";
    }
  }

  logOutShopUser() {
    this.userIsLoggedIn = false;
    this.makeWelcomeString();
    this.userIsAdmin = false;
    this.errorMessage = "";
    this.loginGuestUser();
  }

  async registrationUser(registrationRequest: RegisterRequest) {
    let newShopUserSaved = false;

    if (!this.userIsLoggedIn) {
      console.log(registrationRequest);
      this.http.post<ShopUserAuth>(this.apiService.apiUrl + 'shopUser/register', registrationRequest)
        .subscribe(shopUserAuth => {
          this.authService.authenticatedUser = shopUserAuth;
          this.userIsLoggedIn = true;
          newShopUserSaved = true;
          this.makeWelcomeString();
          // registrated user is always a customer
          this.userIsAdmin = false;
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

  async loginGuestUser() {

    let newShopUserSaved = false;
    let guestEmail: string = "guest@ebiknl.nl";
    let guestPass: string = "123456";
    let shopUser: ShopUser = new ShopUser(null,
      btoa(guestEmail), btoa(guestPass),
      ShopUserRole.GUEST,
      1990, 1,1,
      "gast", "","",
      "","","123456","");
    let shopUserAuth: ShopUserAuth = new ShopUserAuth("",shopUser.shopUserEmail);
    let loginRequest = new LoginRequest(btoa(guestEmail), btoa(guestPass), shopUserAuth);
    this.http.post<ShopUserAuth>(this.apiService.apiUrl+'shopuser/login',loginRequest)
      .subscribe(shopUserAuth => {
          newShopUserSaved = true;
          this.authService.authenticatedUser = shopUserAuth;
          this.authService.authReceived = true;
        },error => {
          console.log(error);
          this.errorMessage = error;
        }
      );
    while (!newShopUserSaved){
      await this.delay(100);
    }
    console.log(" ---- ERROR ----"+ this.errorMessage);
    console.log(" ---- shopUserAuth ----"+ this.authService.authenticatedUser)
  }
}
