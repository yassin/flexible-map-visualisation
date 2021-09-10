import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GoogleMapsDemoComponent} from "./google-maps-demo/google-maps-demo.component";

const routes: Routes = [{path: '', component: GoogleMapsDemoComponent}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
