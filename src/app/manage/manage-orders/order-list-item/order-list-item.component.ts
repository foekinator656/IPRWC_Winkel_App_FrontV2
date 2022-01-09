import {Component, Input, OnInit} from '@angular/core';
import {OrderReportingService} from "../order-reporting.service";
import {BikeOrder} from "../../../shared/models/bike-order.model";

@Component({
  selector: 'app-order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.css']
})
export class OrderListItemComponent implements OnInit {
  @Input("bikeOrder")       bikeOrder!: BikeOrder;
  @Input("bikeOrderPrice")  bikeOrderPrice!:  number;

  constructor(public orderService: OrderReportingService) { }

  ngOnInit(): void {
  }

}
