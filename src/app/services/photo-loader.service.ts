import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import * as firebase from 'firebase';

@Injectable()
export class PhotoLoaderService {

  constructor(private http: Http) {
  }

  savePictures(picture, jsonSizes) {

    let URL ='https://us-central1-photo-loader.cloudfunctions.net/api/uploads/';
    // let URL = 'http://localhost:3001/uploads';

    let formData: FormData = new FormData();
    formData.append('picture', picture, picture.name);
    console.log('formData', formData);

    let sizes = JSON.stringify(jsonSizes);
    formData.append('sizes', sizes);
    console.log('formdata1', formData.get('sizes'));

    let headers = new Headers();
    /** No need to include Content-Type in Angular 4 */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    // let options = new RequestOptions({headers: headers});

    return this.http.post(URL, formData)
               .map(res => res.json()).first().toPromise().then((data) => {
        console.log('dataservice1', data);
        const promiseArray = data.pictures.map((elem) => {
          return firebase.storage().ref('images/' + elem).getDownloadURL();
        });
        return Promise.all(promiseArray);
      });

  }

}
