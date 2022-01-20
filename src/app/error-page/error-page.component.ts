import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  errorMessage!: string;

  errorPhotos: string[] = [
    "assets/404Photos/error_01.webp",
    "assets/404Photos/error_02.png",
    "assets/404Photos/error_03.jpg",
    "assets/404Photos/error_04.jpg",
    "assets/404Photos/error_05.jpg"
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: Data) => {
        this.errorMessage = data['message'];
        this.pickedPhoto = this.randomErrorPhoto();
      }
    );
  }

  public randomErrorPhoto() {
    let randomIndex = Math.floor(Math.random() * this.errorPhotos.length);
    return this.errorPhotos[randomIndex];
  }
}
