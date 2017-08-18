import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PhotoLoaderModule} from './photo-loader/photo-loader.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PhotoLoaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
