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
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-photo-loader',
  templateUrl: './photo-loader.component.html',
  styleUrls: ['./photo-loader.component.css'],
})

export class PhotoLoaderComponent implements OnInit {

  private img;
  loadPictureForm: FormGroup;

  pictureSizes = [
  {
    width: 600,
    height: 600
  }
];

  constructor(
    private photoLoader: PhotoLoaderService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
     this.createLoadForm()
  }

  createLoadForm() {
    this.loadPictureForm = this.fb.group({
      file: new FormControl(null)
    });
  }

  fileChangeEvent(event) {
    if(event && event.target){

      let fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        let file: File = fileList[0];

        this.loadPicture(file, this.pictureSizes)
      }
    }
  }

  loadPicture (picture, pictureSize) {
    this.photoLoader.savePictures(picture, pictureSize).then(
          data => {
            console.log('data', data);
            this.img = data[0];
            console.log('this.img', this.img);
          },
          error => console.log(error)
        )
  }
}
