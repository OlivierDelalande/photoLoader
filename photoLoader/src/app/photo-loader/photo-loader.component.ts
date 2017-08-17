import { Component, OnInit } from '@angular/core';
import {PhotoLoaderService} from '../services/photo-loader.service';

@Component({
  selector: 'app-photo-loader',
  templateUrl: './photo-loader.component.html',
  styleUrls: ['./photo-loader.component.css']
})

export class PhotoLoaderComponent implements OnInit {
  myjson = {
    photo : 'myphoto'
  };
  constructor(
    private photoLoader: PhotoLoaderService) {}

  ngOnInit() {
  }

  sendJSON() {
    this.photoLoader.postJson(this.myjson).subscribe((data) => {
      console.log('url from back', data);
    });
  }

}
