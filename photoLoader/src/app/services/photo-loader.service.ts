import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class PhotoLoaderService {

  constructor(private http: Http) { }

  getJson() {
    return this.http.get('http://localhost:8080').map((data) => data.json())
  }
}
