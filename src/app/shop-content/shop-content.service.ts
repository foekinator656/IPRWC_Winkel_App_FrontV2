import { Injectable } from '@angular/core';
import {BikeModel} from "../shared/models/bike-model.model";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../shared/api.service";
import {catchError, map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShopContentService {
  public errorMessage!: string;

  bikeModels: BikeModel[] = [];

  constructor(private http: HttpClient,private apiService: ApiService) {}

  fetchBikeModels() {


    this.http.get<BikeModel[]>(this.apiService.apiUrl+'bikemodel')
      .subscribe(bikeModels => {
        console.log(bikeModels);
        this.bikeModels = bikeModels;
      }, error => {
        console.log(error);
        this.errorMessage = error;
      });
  }

  setBikeModels(bikeModels: BikeModel[])
    {
      this.bikeModels = bikeModels;
    }
}

