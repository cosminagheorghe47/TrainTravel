// search.component.ts

import { Component, OnInit } from '@angular/core';
import { StationService } from '../../services/station.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  stations: any[] = [];
  searchForm: any = {
    departure: null,
    arrival: null,
    date: null,
  };
  searchResults: any[] = [];

  constructor(private stationService: StationService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.stationService.getStations().subscribe(
      (response: any) => {
        this.stations = response.data || [];  // Adjust accordingly if 'data' is not present
      },
      error => {
        console.error('Error fetching stations:', error);
      }
    );
  }

  onSubmit(): void {
    const departureStationId = this.searchForm.departure;
    const arrivalStationId = this.searchForm.arrival;
    const departureDate = this.searchForm.date;

    const apiUrl = `https://freeapi.miniprojectideas.com/api/TrainApp/GetTrainsBetweenStations?departureStationId=${departureStationId}&arrivalStationId=${arrivalStationId}&departureDate=${departureDate}`;
    console.log(departureStationId,arrivalStationId,departureDate);
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        if (Array.isArray(response.data)) {
          this.searchResults = response.data;
          console.log(this.searchResults);
          this.router.navigate(['/trains'], { queryParams: { results: JSON.stringify(this.searchResults) } });
        } else {
          console.error('Invalid API response structure:', response);
        }
      },
      error => {
        console.error('API Request failed:', error);
      }
    );
  }
}
