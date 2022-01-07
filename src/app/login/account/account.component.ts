import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AccountService} from "./account.service";
import {NgForm} from "@angular/forms";
import {LoginRequest} from "../../shared/models/login.request";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(public accountService: AccountService, public router: Router) { }

  ngOnInit(): void {
  }

  OnChangeAddress() {
    this.accountService.changeAddressMode = true;
  }

  onGoToShop() {
    this.router.navigate(['/','shop']);
  }

  onSubmitChangeShopUserAddress(changeAddressForm: NgForm) {
    this.accountService.changeAddress(
      changeAddressForm.value.streetChange,
      changeAddressForm.value.houseNrChange,
      changeAddressForm.value.postalCodeChange,
      changeAddressForm.value.cityChange)
    this.router.navigate(['/','account']);
  }
}
