// station.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  private apiUrl = 'https://freeapi.miniprojectideas.com/api/TrainApp/GetAllStations';

  constructor(private http: HttpClient) { }

  getStations(): Observable<any> {
    console.log("get statii");
    return this.http.get<any>(this.apiUrl);
  }
}
