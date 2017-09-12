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
  loadPictureForm: FormGroup;

  pictureSizes = [
    {
      width: 600,
      height: 600,
    },
    {
      width: 300,
      height: 300,
    },
    {
      width: 150,
      height: 150,
    },
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
          },
        )
        .catch(error => console.log(error));
  }
}
