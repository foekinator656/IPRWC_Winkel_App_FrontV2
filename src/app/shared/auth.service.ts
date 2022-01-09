import { Injectable } from '@angular/core';
import {ShopUser} from "./models/shop-user.model";
import {ShopUserAuth} from "./models/shop-user-auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticatedUser! : ShopUserAuth;
  constructor() { }
}
