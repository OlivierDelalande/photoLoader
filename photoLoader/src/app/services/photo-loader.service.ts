import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class PhotoLoaderService {

  constructor(private http: Http) { }

  postJson(myjson) {
    return this.http.post('http://localhost:8080', myjson).map((data) => data.json()
    );
  }

}
