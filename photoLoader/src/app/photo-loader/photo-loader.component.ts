import {
  Component,
  OnInit,
} from '@angular/core';
import {PhotoLoaderService} from '../services/photo-loader.service';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'app-photo-loader',
  templateUrl: './photo-loader.component.html',
  styleUrls: ['./photo-loader.component.css'],
  providers: [FileUploader],
})

export class PhotoLoaderComponent implements OnInit {
  myjson = {};
  public uploader: FileUploader = new FileUploader({url: ''});
  constructor(
    private photoLoader: PhotoLoaderService
  ) {}

  ngOnInit() {
    // override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    // this.uploader.onAfterAddingFile = (file) => {
    //   file.withCredentials = false;
    // };
    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //   console.log("ImageUpload:uploaded:", item, status, response);
    // };
  }

  sendJSON() {
    this.photoLoader.postJson(this.myjson).subscribe((data) => {
      console.log('url from back', data);
    });
  }


  // upload() {
  //   const inputEl = this.el.nativeElement.querySelector('#photo');
  //   const fileCount: number = inputEl.files.length;
  //   const formData = new FormData();
  //   if ( fileCount > 0 ) {
  //     formData.append('photo', inputEl.files.item(0));
  //     this.myjson = {
  //       picture: formData.get('photo')};
  //   }
  //   this.photoLoader.postPicture(this.myjson).subscribe((data) => {
  //     console.log('resized picture', data);
  //   });
  // }

}
