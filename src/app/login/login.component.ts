import { Component, OnInit } from '@angular/core';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public loginService: LoginService, public router: Router,
              public authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogOut() {
    this.loginService.logOutShopUser();
    this.router.navigate(['/','shop']);
  }
}
