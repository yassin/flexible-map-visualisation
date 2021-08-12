import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';

import {AppComponent} from './app.component';
import {GoogleMapsModule} from '@angular/google-maps';
import {CommonModule} from '@angular/common';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {GoogleMapsDemoComponent} from "./google-maps-demo/google-maps-demo.component";
import {UploadDetailsComponent} from "./upload-details/upload-details.component";
import {UploadFormComponent} from "./upload-form/upload-form.component";
import {UploadListComponent} from "./upload-list/upload-list.component";
import {environment} from "../environments/environment";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SlidebarComponent } from './slidebar/slidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapsDemoComponent,
    UploadDetailsComponent,
    UploadFormComponent,
    UploadListComponent,
    HeaderComponent,
    FooterComponent,
    SlidebarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
