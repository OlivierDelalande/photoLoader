import {
  Component,
  OnInit,
} from '@angular/core';
import {PhotoLoaderService} from '../services/photo-loader.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-photo-loader',
  templateUrl: './photo-loader.component.html',
  styleUrls: ['./photo-loader.component.css'],
})

export class PhotoLoaderComponent implements OnInit {

  img: string;
  img2: string;
  img3: string;
  progress: boolean;
  loadPictureForm: FormGroup;

  pictureSizes = [
    {
      width: 400,
      height: 250,
    },
    {
      width: 550,
      height: 450,
    },
    {
      width: 900,
      height: 750,
    }
  ];

  constructor(private photoLoader: PhotoLoaderService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createLoadForm();
  }

  createLoadForm() {
    this.loadPictureForm = this.fb.group({
      file: new FormControl(null),
    });
  }

  fileChangeEvent(event) {
    if (event && event.target) {
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        document.getElementsByTagName('form')[0].style.display = 'none';
        this.progress = true;
        this.loadPicture(file, this.pictureSizes);
      }
    }
  }


  setImg(img, img2, img3) {
    this.img = img;
    this.img2 = img2;
    this.img3 = img3;
    console.log('this.img', this.img, this.img2, this.img3);
  }

  loadPicture(picture, pictureSize) {
    this.photoLoader.savePictures(picture, pictureSize)
        .then(data => {
            console.log('datacomponent', data);
            this.setImg(data[0] as string, data[1] as string, data[2] as string);
            this.progress = false;
          },
        )
        .catch(error => console.log(error));
  }
}
