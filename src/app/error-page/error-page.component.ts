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
    "https://seranking.com/blog/wp-content/uploads/2021/01/404_01-min.jpg",
    "https://pics.me.me/error-404-title-not-found-72004682.png",
    "https://i.imgflip.com/25o1f0.jpg",
    "https://ih1.redbubble.net/image.980012386.5663/fposter,small,wall_texture,product,750x1000.jpg",
    "https://www.memecreator.org/static/images/memes/4407023.jpg"
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: Data) => {
        this.errorMessage = data['message'];
        this.randomErrorPhoto();
      }
    );
  }

  public randomErrorPhoto() {
    let randomIndex = Math.floor(Math.random() * this.errorPhotos.length);
    return this.errorPhotos[randomIndex];
  }
}
