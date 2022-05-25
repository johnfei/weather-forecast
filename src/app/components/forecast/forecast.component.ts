import { Component, OnInit } from '@angular/core';
import { DayElement } from '../../app.interface';
import { DataService } from '../../services/data.service';
import { SettingService } from '../../services/setting.service';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  forecastData: DayElement[] = [];
  location: string = '';
  weekDays: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  constructor(
    private dataService: DataService,
    private settingService: SettingService
  ) {}

  ngOnInit(): void {
    this.location = this.settingService.location;
    let observables = [];

    observables.push(this.dataService.forecast({ q: this.location, days: 3 }));
    for (let i = 3; i < 7; i++) {
      observables.push(
        this.dataService.forecast({
          q: this.location,
          dt: moment()
            .add(i, 'days')
            .format('YYYY-MM-DD')
        })
      );
    }

    forkJoin(observables).subscribe(
      (data: any) => {
        for (let d of data) {
          this.forecastData = [
            ...this.forecastData,
            ...d.forecast.forecastday.map((d: any) => this.parseDayElement(d))
          ];
        }
        this.forecastData = this.forecastData.sort(
          (a: DayElement, b: DayElement) => moment(a.date).diff(b.date)
        );
      },
      error => console.error(error)
    );
  }

  /**
   * convert the day element data format
   * @param dayElement Day element data from api request
   */
  private parseDayElement(dayElement: any) {
    return {
      date: dayElement.date,
      weekDay: moment(dayElement.date).day(),
      icon: dayElement.day.condition.icon,
      maxtemp_c: Math.round(dayElement.day.maxtemp_c),
      mintemp_c: Math.round(dayElement.day.mintemp_c),
      description: dayElement.day.condition.text
    };
  }
}
