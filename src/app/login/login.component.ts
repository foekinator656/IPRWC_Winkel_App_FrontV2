import { Component, OnInit } from '@angular/core';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public loginService: LoginService, public router: Router) { }

  ngOnInit(): void {
  }

  onLogOut() {
    this.loginService.logOutShopUser();
    this.router.navigate(['/','shop']);
  }
}
