import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {LocationProviderComponent} from './components/location_provider'
import {DataService} from './dataservices/dataservice'
import {HttpModule} from '@angular/http'

@NgModule({
  declarations: [
    AppComponent,
    LocationProviderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
