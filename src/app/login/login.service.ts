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

  loginShopUser(loginRequest: LoginRequest){
    if (!this.userIsLoggedIn){
      this.http.post<ShopUserAuth>(this.apiService.apiUrl+'shopuser/login',loginRequest)
        .subscribe(shopUserAuth => {
            this.authService.authenticatedUser = shopUserAuth;
            this.userIsLoggedIn = true;
            this.makeWelcomeString();
            let currentShopUserRole =this.authService.authenticatedUser.shopUser.shopUserRole.toString();
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
      let shopUserFirstName = this.authService.authenticatedUser.shopUser.firstName;
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
    this.authService.authenticatedUser.jwt = "";
  }

  async registrationUser(registrationRequest: ShopUser) {
    let newShopUserSaved = false;
    if (!this.userIsLoggedIn) {
      this.http.post<ShopUserAuth>(this.apiService.apiUrl + 'shopuser/register', registrationRequest)
        .subscribe(shopUserAuth => {
          this.authService.authenticatedUser = shopUserAuth;
          this.userIsLoggedIn = true;
          newShopUserSaved = true;
          this.makeWelcomeString();
          let currentShopUserRole = this.authService.authenticatedUser.shopUser.shopUserRole.toString();
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
    let shopUserAuth: ShopUserAuth = new ShopUserAuth(""
      ,shopUser)
    let loginRequest = new LoginRequest(btoa(guestEmail), btoa(guestPass), shopUserAuth);
    this.http.post<ShopUserAuth>(this.apiService.apiUrl+'shopuser/login',loginRequest)
      .subscribe(shopUserAuth => {
          newShopUserSaved = true;
          this.authService.authenticatedUser = shopUserAuth;
          loginRequest.checkShopUserAuth =shopUserAuth;
        },error => {
          console.log(error);
          this.errorMessage = error;
        }
      );

    while (!newShopUserSaved){
      await this.delay(100);
    }
    return loginRequest;
  }
}
