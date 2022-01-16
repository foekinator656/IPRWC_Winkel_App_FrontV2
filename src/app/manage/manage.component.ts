import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-beheer',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  checkUserRoleIsAdmin(){
    if (this.authService.authenticatedUserView.shopUserRole.valueOf() == 2 ||
      this.authService.authenticatedUserView.shopUserRole.valueOf() == 3){
      return true;
    }
    return false;
  }
  checkUserIsCustomer(){
    if (this.authService.authenticatedUserView.shopUserRole.valueOf() == 1){
      return true;
    }
    return false;
  }

  onShowOrdersToggle() {
    this.showOrdersToggle = !this.showOrdersToggle;
  }
}
