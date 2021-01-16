import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpacexService {
  baseURL = 'https://api.spacexdata.com/v3';
  limit = 10;
  offset = 0;
  land_success = true;
  launch_success = true;
  launch_year = 2014;
  // Testing only basic level
  spacexURL = `${this.baseURL}/launches?limit=${this.limit}&offset${this.offset}`;
  launchSuccess = `${this.baseURL}/launches?limit=${this.limit}&launch_success=${this.launch_success}`;
  launchLand = `${this.baseURL}/launches?limit=${this.limit}&launch_success=${this.launch_success}&land_success=${this.land_success}`;
  allData = `${this.baseURL}/launches?limit=${this.limit}&launch_success=${this.launch_success}&land_success=${this.land_success}&launch_year=${this.launch_year}`;

  constructor(private http: HttpClient) {}

  getSpacexLaunches() {
    return this.http.get(this.spacexURL);
  }
}
