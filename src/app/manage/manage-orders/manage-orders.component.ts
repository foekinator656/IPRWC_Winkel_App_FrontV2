import { Component, OnInit } from '@angular/core';
import {OrdersService} from "./orders.service";
import {BikeOrder} from "../../shared/models/bike-order.model";

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  constructor(public orderService: OrdersService) { }

  ngOnInit(): void {
    this.orderService.fetchBikeOrders();
  }

}
