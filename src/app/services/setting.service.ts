import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  weatherAPIKey: string = '08a46e22a729484daea41458222405';
  location: string = 'Sydney';

  constructor() {}
}
