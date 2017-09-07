import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
// let URL ='https://us-central1-photo-loader.cloudfunctions.net/api/uploads/';

@Injectable()
export class PhotoLoaderService {

  constructor(private http: Http) { }

  postJson(myjson) {
    return this.http.post('https://us-central1-photo-loader.cloudfunctions.net/api/', myjson).map((data) => data.json()
    );
  }

  savePictures(picture, jsonSizes) {

    // let URL = 'http://localhost:3001/uploads';
    let URL ='https://us-central1-photo-loader.cloudfunctions.net/api/uploads/';

    let formData: FormData = new FormData();
    formData.append('picture', picture, picture.name);

    let sizes = JSON.stringify(jsonSizes);
    formData.append('sizes', sizes);

    let headers = new Headers();
    /** No need to include Content-Type in Angular 4 */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    // let options = new RequestOptions({headers: headers});

     return this.http.post(URL, formData)
        .map(res => res.json());
  }

}
