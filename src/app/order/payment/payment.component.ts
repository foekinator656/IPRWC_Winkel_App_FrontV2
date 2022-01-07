import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../login/login.service";
import {OrderService} from "../order.service";
import {BikeOrder} from "../../shared/models/bike-order.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(public loginFormService: LoginService, public orderService: OrderService, public router: Router) { }

  ngOnInit(): void {
  }

  onPlaceOrder() {
    this.orderService.sendOrder();
  }

  checkNoEmptyCart() {
    if (this.orderService.bikesInCart.length === 0){
      this.router.navigate(['/','not-found']);
      return false;
    }
    return true;
  }
}
