import { Injectable } from '@angular/core';
import {ShopUser} from "./models/shop-user.model";
import {ShopUserAuth} from "./models/shop-user-auth.model";
import {LoginRequest} from "./models/login.request";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // this is the user that is currently logged in
  authenticatedUser! : ShopUserAuth;
  authReceived: boolean = false;
  constructor() { }
}
