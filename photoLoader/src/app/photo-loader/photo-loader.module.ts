import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoLoaderComponent } from './photo-loader.component';
import {HttpModule, } from '@angular/http';
import {PhotoLoaderService} from '../services/photo-loader.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [PhotoLoaderComponent],
  exports: [PhotoLoaderComponent],
  providers: [PhotoLoaderService]
})
export class PhotoLoaderModule { }
