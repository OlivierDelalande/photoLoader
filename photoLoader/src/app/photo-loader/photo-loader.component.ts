import {
  Component,
  OnInit,
} from '@angular/core';
import {PhotoLoaderService} from '../services/photo-loader.service';
import {FileUploader} from 'ng2-file-upload';
import {
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-photo-loader',
  templateUrl: './photo-loader.component.html',
  styleUrls: ['./photo-loader.component.css'],
})

export class PhotoLoaderComponent implements OnInit {
  myjson = {
    test: "hello",
    test2: "world",
    test3: [

    ]
      };
  jsonPicture;
  picture;
  loadPictureForm: FormGroup;
  public uploader: FileUploader = new FileUploader({url: ''});

  constructor(
    private photoLoader: PhotoLoaderService,
    private fb: FormBuilder
  ) {}

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

  loadPicture(picture) {
    // this.jsonPicture = {photo: picture};
    // this.picture = this.convert(picture);
    console.log(this.picture);
    this.photoLoader.postPicture(this.picture);
    // console.log('load picture', picture);
  }

  inputValueChanged(event) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const files: FileList = target.files;

    if (files && files[0]) {

      const reader = new FileReader();

      reader.onload = (nevent: any) => {
        this.picture = nevent.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);

      this._file = files[0];
      this.fileName = this._file.name;
    } else {
      this._file = null;
      this.fileName = null;
    }
    this.propagateChange(this._file);
  }

  // convert(img) {
  //   var canvas = document.createElement("canvas");
  //   canvas.width = img.width;
  //   canvas.height = img.height;
  //   var ctx = canvas.getContext("2d");
  //   ctx.drawImage(img, 0, 0);
  //   var dataURL = canvas.toDataURL("image/png");
  //   return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  // }

}
