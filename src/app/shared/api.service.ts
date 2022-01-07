import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _apiUrl: string = 'http://localhost:8080/';

  get apiUrl(): string {
    return this._apiUrl;
  }
}
