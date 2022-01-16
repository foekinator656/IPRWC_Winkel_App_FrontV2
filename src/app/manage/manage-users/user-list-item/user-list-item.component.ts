import {Component, Input, OnInit} from '@angular/core';
import {ShopUserView} from "../../../shared/models/shop-user-view.model";
import {UserReportingService} from "../user-reporting.service";

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {

  @Input("shopUserView")  shopUserView!:  ShopUserView;
  @Input("shopUserIndex") shopUserIndex!: number;

  shopUserMail!: string;

  constructor(public userReportingService: UserReportingService) { }

  ngOnInit(): void {
      this.shopUserMail = atob(this.shopUserView.shopUserEmail);
  }

  onDeleteShopUser() {
    this.userReportingService.deleteShopUser(this.shopUserIndex);
  }
}
