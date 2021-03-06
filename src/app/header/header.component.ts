import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from "../login/login.service";
import {ShopUserRole} from "../shared/models/shop-user-role.enum";
import {AccountService} from "../login/account/account.service";
import {AuthService} from "../shared/auth.service";




const dataAdmin = ShopUserRole.DATA_ADMIN;
const sysAdmin = ShopUserRole.SYS_ADMIN;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public loginService: LoginService, public accountService: AccountService,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.loginService.makeWelcomeString()
  }

  onProfileView() {
    if (this.loginService.userIsLoggedIn)
    this.accountService.accountViewUser = this.authService.authenticatedUserView;
  }
}
