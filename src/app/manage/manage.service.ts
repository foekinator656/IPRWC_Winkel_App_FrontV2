import { Injectable } from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import {LoginService} from "../login/login.service";

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  constructor(public authService: AuthService, public router: Router, public loginService: LoginService) { }

  checkIfUserIsAdmin(){

    if (this.loginService.userIsAdmin){
      return true;
    }
    this.router.navigate(['/','not-found']);
    return false;
  }
  checkUserIsCustomer(){
    if (this.authService.authenticatedUserView.shopUserRole.valueOf() == 1){
      return true;
    }
    this.router.navigate(['/','not-found']);
    return false;
  }


}
