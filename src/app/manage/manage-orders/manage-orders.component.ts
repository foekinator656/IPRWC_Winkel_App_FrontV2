import { Component, OnInit } from '@angular/core';
import {OrdersService} from "./orders.service";
import {BikeOrder} from "../../shared/models/bike-order.model";
import {LoginService} from "../../login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  constructor(public orderService: OrdersService,public loginService: LoginService,public router: Router) { }

  ngOnInit(): void {
    this.orderService.fetchBikeOrders();
  }

  checkIfUserIsAdmin() {
    if (!this.loginService.userIsAdmin){
      this.router.navigate(['/','not-found']);
      return false;
    }
    return true;
  }
}
