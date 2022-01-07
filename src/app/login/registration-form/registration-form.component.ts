import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ShopUser} from "../../shared/models/shop-user.model";
import {ShopUserRole} from "../../shared/models/shop-user-role.enum";
import {LoginService} from "../login.service";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  constructor(public loginService: LoginService) {}
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


    console.log(" ===== ");
    console.log(" ===== " + "ik ben hier");
    console.log(" ===== " );



    // let registrationRequest: ShopUser =
    //   new ShopUser(null,
    //     registrationForm.value.emailReg,
    //     registrationForm.value.passwordReg,
    //     ShopUserRole.CUSTOMER,
    //     registrationForm.value.dobYear,
    //     registrationForm.value.dobMonth,
    //     registrationForm.value.dobDay,
    //     registrationForm.value.firstNameReg,
    //     registrationForm.value.middleNameReg,
    //     registrationForm.value.lastNameReg,
    //     registrationForm.value.streetReg,
    //     registrationForm.value.houseNrReg,
    //     registrationForm.value.postalcodeReg,
    //     registrationForm.value.cityReg);
    let registrationRequest: ShopUser =
      new ShopUser(null,
        "registrationForm.value.emailReg@ap.com",
        "registrationForm.value.passwordReg",
        ShopUserRole.CUSTOMER,
        1990,
        1,
        1,
        "registrationForm.value.firstNameReg",
        "registrationForm.value.middleNameReg",
        "registrationForm.value.lastNameReg",
        "registrationForm.value.streetReg",
        "registrationForm.value.houseNrReg",
        "2215WB",
        "registrationForm.value.cityReg");
    console.log(registrationRequest);

    console.log(" ===== ");
    console.log(" ===== " + "ik ben hier +  let registrationRequest: ShopUser =");
    console.log(" ===== " );
    this.loginService.registrationUser(registrationRequest);
    console.log(" ===== ");
    console.log(" ===== " + "ik ben hier + this.loginService.registrationUser(registrationRequest)");
    console.log(" ===== " );
    this.loginService.makeWelcomeString();
    console.log(" ===== ");
    console.log(" ===== " + "ik ben hier + this.loginService.makeWelcomeString()");
    console.log(" ===== " );
  }
}
