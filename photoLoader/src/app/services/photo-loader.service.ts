import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class PhotoLoaderService {

  constructor(private http: Http) { }

  savePictures(picture, jsonSizes) {

    let URL ='https://us-central1-photo-loader.cloudfunctions.net/api/uploads/';

    let formData: FormData = new FormData();
    formData.append('picture', picture, picture.name);

    let sizes = JSON.stringify(jsonSizes);
    formData.append('sizes', sizes);
    console.log('formdata1', formData.get('sizes'));

    let headers = new Headers();
    /** No need to include Content-Type in Angular 4 */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    // let options = new RequestOptions({headers: headers});

     return this.http.post(URL, formData)
        .map(res => res.json());
  }

}
