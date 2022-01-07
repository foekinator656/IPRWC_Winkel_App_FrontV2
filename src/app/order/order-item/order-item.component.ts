import {Component, Input, OnInit} from '@angular/core';
import {BikeModel} from "../../shared/models/bike-model.model";
import {Bike} from "../../shared/models/bike.model";
import {OrderService} from "../order.service";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input("bike")   bike!: Bike;
  @Input() bikeIndex!: number;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  onDeleteFromCart(bikeIndex: number) {
    this.orderService.deleteBikeFormCart(bikeIndex);
  }
}
