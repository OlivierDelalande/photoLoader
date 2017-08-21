import {
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import {PhotoLoaderService} from '../services/photo-loader.service';

@Component({
  selector: 'app-photo-loader',
  templateUrl: './photo-loader.component.html',
  styleUrls: ['./photo-loader.component.css']
})

export class PhotoLoaderComponent implements OnInit {
  myjson = {};

  constructor(
    private photoLoader: PhotoLoaderService,
    private el: ElementRef) {}

  ngOnInit() {
  }

  sendJSON() {
    this.photoLoader.postJson(this.myjson).subscribe((data) => {
      console.log('url from back', data);
    });
  }
  upload() {
    const inputEl = this.el.nativeElement.querySelector('#photo');
    const fileCount: number = inputEl.files.length;
    const formData = new FormData();
    if ( fileCount > 0 ) {
      formData.append('photo', inputEl.files.item(0));
      this.myjson = {
        picture: formData.get('photo')};
    }
    this.photoLoader.postPicture(this.myjson).subscribe((data) => {
      console.log('resized picture', data);
    });
  }
}
