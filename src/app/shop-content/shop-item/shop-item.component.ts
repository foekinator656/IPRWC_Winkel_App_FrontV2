import {Component, Input, OnInit} from '@angular/core';
import {BikeModel} from "../../shared/models/bike-model.model";
import {OrderService} from "../../order/order.service";
import {colors} from "@angular/cli/utilities/color";



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

  onAddToCart(bikeModel: BikeModel) {
    this.orderService.addBikeModelToCart(bikeModel);

    // color.button.green("onAddToCart");
   // color.style.backgroundColor
   //  document.body.style.backgroundColor = "green";
  }
}
