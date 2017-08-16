import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-loader',
  templateUrl: './photo-loader.component.html',
  styleUrls: ['./photo-loader.component.css']
})
export class PhotoLoaderComponent implements OnInit {

  myjson = {
    photo : 'myphoto'
};
  constructor() { }

  ngOnInit() {
  }

  sendJSON () {
    console.log('JSON sent');
    console.log(this.myjson);
  }
}
