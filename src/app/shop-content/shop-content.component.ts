import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ShopContentService} from "./shop-content.service";
import {LoginService} from "../login/login.service";
import {LoginRequest} from "../shared/models/login.request";

@Component({
  selector: 'app-shop-content',
  templateUrl: './shop-content.component.html',
  styleUrls: ['./shop-content.component.css']
})
export class ShopContentComponent implements OnInit {
  shopContentService: ShopContentService;
  constructor(shopContentService: ShopContentService, private http: HttpClient,private loginService: LoginService) {
    this.shopContentService = shopContentService;
  }

  ngOnInit(){
    // login with guest
    let loginRequest: LoginRequest = await this.loginService.loginGuestUser();
    this.shopContentService.fetchBikeModels(loginRequest);

  }

}
