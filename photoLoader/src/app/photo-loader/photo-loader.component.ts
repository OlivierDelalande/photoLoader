import {
  Component,
  OnInit
} from '@angular/core';
import {PhotoLoaderService} from '../services/photo-loader.service';
import {
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import {
  Http
} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-photo-loader',
  templateUrl: './photo-loader.component.html',
  styleUrls: ['./photo-loader.component.css'],
})

export class PhotoLoaderComponent implements OnInit {
  myjson = {
    test: "hello",
    test2: "world"
      };
  filesToUpload: Array<File>;
  loadPictureForm: FormGroup;

  constructor(
    private photoLoader: PhotoLoaderService,
    private fb: FormBuilder,
    private http: Http
  ) {
    this.filesToUpload = [];
  }

  ngOnInit() {
     this.createLoadForm()
  }

  sendJSON() {
    this.photoLoader.postJson(this.myjson).subscribe((data) => {
      console.log('url from back', data);
    });
  }

  createLoadForm() {
    this.loadPictureForm = this.fb.group({
      file: new FormControl(null)
    });
  }

  // loadPicture() {
  //   this.makeFileRequest("https://us-central1-photo-loader.cloudfunctions.net/api/upload/", [], this.filesToUpload).then((result) => {
  //     console.log(result);
  //   }, (error) => {
  //     console.error(error);
  //   });
  // }
  //
  // fileChangeEvent(fileInput: any){
  //   console.log('fileInput', fileInput);
  //   this.filesToUpload = <Array<File>> fileInput.target.files;
  //   console.log('filesToUpload', this.filesToUpload);
  // }
  //
  // makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
  //   console.log('makeFileRequest');
  //   return new Promise((resolve, reject) => {
  //     var formData: any = new FormData();
  //     var xhr = new XMLHttpRequest();
  //     for(var i = 0; i < files.length; i++) {
  //       formData.append("uploads[]", files[i], files[i].name);
  //     }
  //     console.log('formData', formData);
  //     xhr.onreadystatechange = function () {
  //       if (xhr.readyState == 4) {
  //         if (xhr.status == 200) {
  //           resolve(JSON.parse(xhr.response));
  //         } else {
  //           reject(xhr.response);
  //         }
  //       }
  //     };
  //     xhr.open("POST", url, true);
  //     console.log('formData2', formData);
  //     xhr.send(formData);
  //   });
  // }



  fileChangeEvent(event) {
    if(event && event.target){
      let fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        // console.log('filelist',fileList[0]);
        let file: File = fileList[0];
        // console.log('file', file);
        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        // console.log('formdata1', formData.get('uploadFile'));
        let headers = new Headers();
        /** No need to include Content-Type in Angular 4 */
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        // let options = new RequestOptions({headers: headers});
        console.log('formdata2', formData.get('uploadFile'));
        this.http.post('https://us-central1-photo-loader.cloudfunctions.net/api/upload/', formData)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
              data => console.log('success', data),
              error => console.log(error)
            )
      }
    }
  }
}
