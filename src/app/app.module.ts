import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { AppComponent } from './app.component';
import { ForecastComponent } from './components/forecast/forecast.component';

@NgModule({
  declarations: [AppComponent, ForecastComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
