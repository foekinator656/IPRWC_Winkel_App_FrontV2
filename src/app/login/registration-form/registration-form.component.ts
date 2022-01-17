import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ShopUser} from "../../shared/models/shop-user.model";
import {ShopUserRole} from "../../shared/models/shop-user-role.enum";
import {LoginService} from "../login.service";
import {Router} from "@angular/router";
import {RegisterRequest} from "../../shared/models/register-request.model";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  constructor(public loginService: LoginService,public authService: AuthService) {}
  ngOnInit(): void {
  }

  onCompletRegistration(registrationForm: NgForm) {
    if (!registrationForm.valid) return;

    console.log(registrationForm.value.dob);
    let dobDate = new Date(registrationForm.value.dob);
    let dobString = dobDate.toString();
    console.log(" ===== " + dobString);
    console.log(" ===== " + registrationForm.value.emailReg);
    console.log(" ===== " + registrationForm.value.passwordReg);
    console.log(" ===== " + registrationForm.value.dobYear);
    console.log(" ===== " + registrationForm.value.dobMonth);
    console.log(" ===== " + registrationForm.value.dobDay);
    console.log(" ===== " + registrationForm.value.firstNameReg);
    console.log(" ===== " + registrationForm.value.middleNameReg);
    console.log(" ===== " + registrationForm.value.lastNameReg);
    console.log(" ===== " + registrationForm.value.streetReg);
    console.log(" ===== " + registrationForm.value.postalcodeReg);
    console.log(" ===== " + registrationForm.value.cityReg);

    let registrationUser: ShopUser =
      new ShopUser(null,
        this.encodeString(registrationForm.value.emailReg),
        this.encodeString(registrationForm.value.passwordReg),
        ShopUserRole.CUSTOMER,
        registrationForm.value.dobYear,
        registrationForm.value.dobMonth,
        registrationForm.value.dobDay,
        registrationForm.value.firstNameReg,
        registrationForm.value.middleNameReg,
        registrationForm.value.lastNameReg,
        registrationForm.value.streetReg,
        registrationForm.value.houseNrReg,
        registrationForm.value.postalcodeReg,
        registrationForm.value.cityReg);

    let registrationRequest = new RegisterRequest(registrationUser,this.authService.authenticatedUser);

    this.loginService.registrationUser(registrationRequest);
    this.loginService.makeWelcomeString();
  }

  encodeString(data: string){
    return btoa(data);
  }
}
