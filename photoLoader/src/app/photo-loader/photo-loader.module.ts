import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoLoaderComponent } from './photo-loader.component';
import {HttpModule, } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [PhotoLoaderComponent],
  exports: [PhotoLoaderComponent]
})
export class PhotoLoaderModule { }
