import {Injectable} from '@angular/core';
import {BikeModel} from "../shared/models/bike-model.model";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../shared/api.service";
import {AuthService} from "../shared/auth.service";
import {ShopUserAuth} from "../shared/models/shop-user-auth.model";

@Injectable({
  providedIn: 'root'
})
export class ShopContentService {
  public errorMessage!: string;

  bikeModels: BikeModel[] = [];
  delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  constructor(private http: HttpClient,private apiService: ApiService, private authService: AuthService) {}

  async fetchBikeModels() {
    while (!this.authService.authReceived) {
      await this.delay(100);
    }
     let shopUserAuth: ShopUserAuth =  this.authService.authenticatedUser;
     let bikeModelsReceived = false;
        this.http.post<BikeModel[]>(this.apiService.apiUrl+'bikeModel',shopUserAuth)
      .subscribe(bikeModels => {
        this.bikeModels = bikeModels;
        bikeModelsReceived = true;
      }, error => {
        console.log(error);
        this.errorMessage = error;
      });
    while (!bikeModelsReceived){
      await this.delay(100);
    }

  }
}

