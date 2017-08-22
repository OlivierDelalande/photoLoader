import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoLoaderComponent } from './photo-loader.component';
import {HttpModule, } from '@angular/http';
import {PhotoLoaderService} from '../services/photo-loader.service';
import {InputFileModule} from '../../DopplerEffectModules/module-input-file/input-file.module';
import {FormsModule} from '@angular/forms';
import {FileSelectDirective} from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    InputFileModule,
    FormsModule
  ],
  declarations: [PhotoLoaderComponent, FileSelectDirective],
  exports: [PhotoLoaderComponent ],
  providers: [PhotoLoaderService]
})
export class PhotoLoaderModule { }
