import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpacexService {
  baseURL = 'https://api.spacexdata.com/v3';
  limit = 100;
  offset = 0;

  constructor(private http: HttpClient) {}

  getSpacexLaunches() {
    const spacexURL = `${this.baseURL}/launches?limit=${this.limit}&offset${this.offset}`;
    return this.http.get(spacexURL);
  }
}
