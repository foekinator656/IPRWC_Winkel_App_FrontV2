import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from "./order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() totalOrderPrice: number = 0;
  constructor(public orderService: OrderService,  public router: Router) { }

  ngOnInit(): void {
  }

  onOrderButtonPressed() {
    this.orderService.sendSuccess = false;
    this.router.navigate(['/','payment']);
  }
}
