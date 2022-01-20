import { Component, OnInit } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Form} from "@angular/forms";
import {LoginService} from "../login.service";
import {LoginRequest} from "../../shared/models/login.request";
import {Router} from "@angular/router";
import {ShopUserAuth} from "../../shared/models/shop-user-auth.model";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  errorMessage!: string;
  constructor(public loginService: LoginService, public router: Router,private authService: AuthService) { }
  ngOnInit(): void {}

  onLoginShopUser(loginForm: NgForm) {
    if (!loginForm.valid) return;
    let loginRequest = new LoginRequest( btoa(loginForm.value.email),  btoa(loginForm.value.password), this.authService.authenticatedUser);

    this.loginService.loginShopUser(loginRequest);
  }

  onRegister() {
    this.router.navigate(['/','registration']);
  }
}
