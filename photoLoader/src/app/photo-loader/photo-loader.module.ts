import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoLoaderComponent } from './photo-loader.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PhotoLoaderComponent],
  exports: [PhotoLoaderComponent]
})
export class PhotoLoaderModule { }
