import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'https://freeapi.gerasim.in/api/TrainApp';

  constructor(private http: HttpClient) {}

  bookTrain(bookingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/BookTrain`, bookingData);
  }

  getBookingsByPassengerId(passengerId: number): Observable<any[]> {
    const url = `${this.apiUrl}/GetBookingByPassengerId?passengerid=${passengerId}`;
    return this.http.get<any[]>(url);
  }
}
