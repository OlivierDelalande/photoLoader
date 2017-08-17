import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

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
    private http: Http
  ) { }
  ngOnInit() {
  }
  sendJSON () {
    console.log('JSON sent');
    console.log(this.myjson);
    this.http.get('http://localhost:8080').subscribe(data => {
      console.log(data.json());
    });
  }
}
