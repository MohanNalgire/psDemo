import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpacexService } from './spacex.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  spaceXLoches = [];
  years: number[];
  constructor(private spacexService: SpacexService) {}

  range = (start, end, length = end - start + 1) => {
    return Array.from({ length }, (_, i) => start + i);
  };

  fetchData(): void {
    this.spacexService.getSpacexLaunches().subscribe(
      (data: any) => {
        this.spaceXLoches = data;
        console.log('space x data', data);
      },
      (error) => {
        console.error('space x data fetch error:', error);
      },
      () => {
        console.info('space x data fetch completed');
      }
    );
  }

  ngOnInit() {
    this.fetchData();
    this.years = this.range(2010, 2020);
    console.log('this.years', this.years);
  }

  ngOnDestroy() {}
}
