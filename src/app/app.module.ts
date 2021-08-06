import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {GoogleMapsDemoModule} from './google-maps-demo/google-maps-demo.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GoogleMapsDemoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
