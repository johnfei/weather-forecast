import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SettingService } from './setting.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient,
    private settingService: SettingService
  ) {}

  forecast(args: any) {
    let url = `http://api.weatherapi.com/v1/forecast.json`;
    let params = new HttpParams().set('key', this.settingService.weatherAPIKey);
    for (let key in args) {
      params = params.set(key, args[key]);
    }
    return this.http
      .get(url, { params: params })
      .pipe(
        catchError((error: any) =>
          throwError(
            error.error && error.error.error && error.error.error.message
              ? error.error.error.message
              : 'Server error'
          )
        )
      );
  }
}
