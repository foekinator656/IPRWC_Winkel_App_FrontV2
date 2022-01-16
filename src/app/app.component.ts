import {Component, OnInit} from '@angular/core';
import {LoginService} from "./login/login.service";
import {AuthService} from "./shared/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Frontv2';

  constructor(private loginService: LoginService) {
  }

  async ngOnInit(){
    await this.loginService.loginGuestUser();
    this.loginService.userIsLoggedIn = false;
    this.loginService.userIsAdmin = false;
  }
}
