import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ShopContentService} from "./shop-content.service";
import {BikeModel} from "../shared/models/bike-model.model";

@Component({
  selector: 'app-shop-content',
  templateUrl: './shop-content.component.html',
  styleUrls: ['./shop-content.component.css']
})
export class ShopContentComponent implements OnInit {
  shopcontentService: ShopContentService;
  constructor(shopContentService: ShopContentService, private http: HttpClient) {
    this.shopcontentService = shopContentService;
  }

  ngOnInit(): void {
    this.shopcontentService.fetchBikeModels();
    // this.fetchBikeModels();
    // TODO clear the list with bikes in the order
  }

  // private fetchBikeModels() {
  //   this.http.get<BikeModel[]>('http://localhost:8080/bikemodel')
  //     .subscribe(bikeModels => {
  //       console.log(bikeModels);
  //         this.shopcontentService.bikeModels = bikeModels;
  //     });
  // }

}
