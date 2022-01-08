import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from "../login/login.service";
import {ShopUserRole} from "../shared/models/shop-user-role.enum";
import {AccountService} from "../login/account/account.service";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dataAdmin = ShopUserRole.DATA_ADMIN;
  sysAdmin = ShopUserRole.SYS_ADMIN;

  constructor(public loginService: LoginService, public accountService: AccountService,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.loginService.makeWelcomeString()
  }

  onProfileView() {
    if (this.loginService.userIsLoggedIn)
    this.accountService.accountViewUser = this.authService.authenticatedUser.shopUser;
  }
}
