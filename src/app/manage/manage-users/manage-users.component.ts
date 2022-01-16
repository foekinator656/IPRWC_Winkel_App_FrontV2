import { Component, OnInit } from '@angular/core';
import {ManageService} from "../manage.service";
import {UserReportingService} from "./user-reporting.service";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  constructor(public manageService: ManageService, public userReportingService: UserReportingService) { }

  ngOnInit(): void {
    this.userReportingService.shopUserViewsReceived = false;
    this.userReportingService.fetchShopUserViews();
  }

}
