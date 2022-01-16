import {Component, Input, OnInit} from '@angular/core';
import {BikeOrder} from "../../../../shared/models/bike-order.model";
import {Bike} from "../../../../shared/models/bike.model";

@Component({
  selector: 'app-bikes-in-order',
  templateUrl: './bikes-in-order.component.html',
  styleUrls: ['./bikes-in-order.component.css']
})
export class BikesInOrderComponent implements OnInit {
  @Input("bikeInOrder")       bikeInOrder!: Bike;
  constructor() { }

  ngOnInit(): void {
  }

}
