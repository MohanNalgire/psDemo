import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpacexService } from './spacex.service';

interface filtersI {
  year: number;
  launch_success: boolean;
  landing_success: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  spaceXLoches = [];
  years: number[];
  launchData: any;
  launchStatus = ['yes', 'no'];
  filteredLaunchResult: any[];
  emptyFilter: filtersI = {
    year: null,
    launch_success: null,
    landing_success: null,
  };
  constructor(private spacexService: SpacexService) {}

  range = (start, end, length = end - start + 1) => {
    return Array.from({ length }, (_, i) => start + i);
  };

  fetchData(): void {
    this.spacexService.getSpacexLaunches().subscribe(
      (data: any) => {
        this.spaceXLoches = data;
        this.selectedFilters(this.emptyFilter);
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

  selectedFilters(filter) {
    const currentFilter: filtersI = {
      year: filter.year,
      launch_success: filter.launch_success === 'yes' ? true : false,
      landing_success: filter.landing_success === 'yes' ? true : false,
    };

    this.filteredLaunchResult = this.spaceXLoches.filter((e) => {
      if (currentFilter.year > 0) {
        return e.launch_year === currentFilter.year.toString();
      } else if (filter.launch_success) {
        return e.launch_success === currentFilter.launch_success;
      } else if (filter.landing_success) {
        return e.landing_success === currentFilter.landing_success;
      } else {
        return this.spaceXLoches;
      }
    });
    return this.filteredLaunchResult;
  }

  ngOnInit() {
    this.fetchData();
    this.years = this.range(2010, 2020);
    console.log('this.years', this.years);
  }

  ngOnDestroy() {}
}
