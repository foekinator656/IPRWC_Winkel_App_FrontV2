import { Component, OnInit } from '@angular/core';
import {OrderReportingService} from "./order-reporting.service";
import {BikeOrder} from "../../shared/models/bike-order.model";
import {LoginService} from "../../login/login.service";
import {Router} from "@angular/router";
import {ManageService} from "../manage.service";

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  constructor(public manageService: ManageService, public orderReportingService: OrderReportingService, public loginService: LoginService, public router: Router) { }

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
