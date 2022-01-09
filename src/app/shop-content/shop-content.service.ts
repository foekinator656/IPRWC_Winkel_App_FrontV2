import {Injectable} from '@angular/core';
import {BikeModel} from "../shared/models/bike-model.model";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../shared/api.service";
import {LoginRequest} from "../shared/models/login.request";
import {AuthService} from "../shared/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ShopContentService {
  public errorMessage!: string;

  bikeModels: BikeModel[] = [];

  constructor(private http: HttpClient,private apiService: ApiService,private authService: AuthService) {}

  fetchBikeModels(loginRequest:LoginRequest) {
        this.http.post<BikeModel[]>(this.apiService.apiUrl+'bikemodel',loginRequest)
      .subscribe(bikeModels => {
        console.log(bikeModels);
        this.bikeModels = bikeModels;
        this.authService.authenticatedUser = loginRequest.checkShopUserAuth;
      }, error => {
        console.log(error);
        this.errorMessage = error;
      });
  }
}

