import {
  Component,
  OnInit,
  ElementRef
} from '@angular/core';
import {PhotoLoaderService} from '../services/photo-loader.service';
import {
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import {
  Http,
  Response
} from '@angular/http';
import {Observable} from 'rxjs/Observable';
const URL = 'http://localhost:3001/uploads';
// const URL ='https://us-central1-photo-loader.cloudfunctions.net/api/uploads/';

@Component({
  selector: 'app-photo-loader',
  templateUrl: './photo-loader.component.html',
  styleUrls: ['./photo-loader.component.css'],
})

export class PhotoLoaderComponent implements OnInit {

  private img;
  myjson = {
    test: "hello",
    test2: "world"
      };
  filesToUpload: Array<File>;
  loadPictureForm: FormGroup;
  pictureSizes = [
  {
    width: 600,
    height: 600
  },
  {
    width: 300,
    height: 300
  },
  {
    width: 150,
    height: 150
  }
];

  constructor(
    private photoLoader: PhotoLoaderService,
    private fb: FormBuilder,
    private http: Http,
    private el: ElementRef
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
        let file: File = fileList[0];

        let formData: FormData = new FormData();
        formData.append('picture', file, file.name);

        let sizes = JSON.stringify(this.pictureSizes);
        formData.append('sizes', sizes);
        console.log('formdata1', formData.get('sizes'));

        let headers = new Headers();
        /** No need to include Content-Type in Angular 4 */
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        // let options = new RequestOptions({headers: headers});

        this.http.post(URL, formData)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
              data => console.log('success', data),
              error => console.log(error)
            )
      }
    }
  }

  // upload() {
  //   // locate the file element meant for the file upload.
  //   let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
  //
  //   // get the total amount of files attached to the file input.
  //   let fileCount: number = inputEl.files.length;
  //
  //   // create a new fromdata instance
  //   let formData = new FormData();
  //
  //   // check if the filecount is greater than zero, to be sure a file was selected.
  //   if (fileCount > 0) { // a file was selected
  //
  //     // append the key name 'picture' with the first file in the element
  //     formData.append('picture', inputEl.files.item(0));
  //     console.log('file', inputEl.files.item(0));
  //     console.log('form data', formData);
  //     formData.set('mydata', {width: 50, height: 50} )
  //
  //     this.http
  //         // post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
  //         .post(URL, formData ).map((res: Response) => res.json())
  //         // .catch(error => Observable.throw(error))
  //         .subscribe(
  //           data => {
  //             console.log('data', data);
  //             this.img = data.url;
  //             console.log(this.img);
  //           },
  //           error => console.error(error)
  //         );
  //   }
  // }

}
