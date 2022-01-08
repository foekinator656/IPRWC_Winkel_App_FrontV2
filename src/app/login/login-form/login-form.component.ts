import { Component, OnInit } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Form} from "@angular/forms";
import {LoginService} from "../login.service";
import {LoginRequest} from "../../shared/models/login.request";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  errorMessage!: string;

  constructor(public loginService: LoginService, public router: Router) { }

  ngOnInit(): void {
  }

  onLoginShopUser(loginForm: NgForm) {
    // if (!loginForm.valid) return;
    // let loginRequest = new LoginRequest(loginForm.value.email, loginForm.value.password);

    //  tijdelijk  ================= KAN WEG
    let email = btoa("SysAdmin@users.com");
    let pass = btoa("sysadmin")
    let loginRequest = new LoginRequest(email, pass);
    // let loginRequest = new LoginRequest("customer@users.com", "DataAdmin");

    this.loginService.loginShopUser(loginRequest);
    this.loginService.makeWelcomeString();
  }


  onRegister() {
    this.router.navigate(['/','registration']);
  }
}
