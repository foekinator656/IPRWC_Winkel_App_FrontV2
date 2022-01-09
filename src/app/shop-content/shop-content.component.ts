import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ShopContentService} from "./shop-content.service";
import {LoginService} from "../login/login.service";
import {LoginRequest} from "../shared/models/login.request";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-shop-content',
  templateUrl: './shop-content.component.html',
  styleUrls: ['./shop-content.component.css']
})
export class ShopContentComponent implements OnInit {
  shopContentService: ShopContentService;
  constructor(shopContentService: ShopContentService, private http: HttpClient,private authService: AuthService) {
    this.shopContentService = shopContentService;
  }

  ngOnInit(){
    // login with guest
    this.shopContentService.fetchBikeModels();
  }

}
