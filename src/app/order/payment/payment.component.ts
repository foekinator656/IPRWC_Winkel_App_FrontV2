import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../login/login.service";
import {OrderService} from "../order.service";
import {BikeOrder} from "../../shared/models/bike-order.model";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(public loginFormService: LoginService, public orderService: OrderService) { }

  ngOnInit(): void {
  }

  onPlaceOrder() {
    this.orderService.sendOrder();
  }
}
