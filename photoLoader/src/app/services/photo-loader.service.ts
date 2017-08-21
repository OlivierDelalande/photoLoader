import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class PhotoLoaderService {

  constructor(private http: Http) { }

  postJson(myjson) {
    return this.http.post('https://us-central1-photo-loader.cloudfunctions.net/api/', myjson).map((data) => data.json()
    );
  }

  postPicture(picture) {
    console.log('picture', picture);
    return this.http.post('https://us-central1-photo-loader.cloudfunctions.net/api/upload', picture).map((data) => data.json()
    );
  }

}
