import {Component, Input, OnInit} from '@angular/core';
import {BikeModel} from "../../shared/models/bike-model.model";
import {OrderService} from "../../order/order.service";

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent implements OnInit {
  @Input("bikeModel")
  bikeModel!: BikeModel;

  constructor(public orderService: OrderService) {
  }

  ngOnInit(): void {
  }

  onAddToCart(bikeModelId: number) {
    this.orderService.addBikeModelToCart(bikeModelId);
  }
}
