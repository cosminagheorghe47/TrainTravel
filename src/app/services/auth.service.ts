
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UserData {
  passengerID: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://freeapi.gerasim.in/api/TrainApp';
  private currentUserSubject: BehaviorSubject<UserData | null> = new BehaviorSubject<UserData | null>(null);

  currentUser$: Observable<UserData | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}
  private bookingId: string | null = null;

  setBookingId(id: string): void {
    console.log('set');
    this.bookingId = id;
  }

  getBookingId(): string | null {
    console.log('get');
    return this.bookingId;
  }
  login(username: string, password: string): Observable<any> {
    const body = { phone: username, password };
    return this.http.post(`${this.apiUrl}/Login`, body).pipe(
      tap((response: any) => {
        if (response.result && response.data) {
          const userData: UserData = {
            passengerID: response.data.passengerID,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            phone: response.data.phone,
          };

          this.currentUserSubject.next(userData);
        }
      })
    );
  }

  logout() {
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): UserData | null {
    return this.currentUserSubject.value;
  }
  register(id: Number, firstName: string,lastName: string,email: string,phone: string, password: string): Observable<any> {
    const body = { passengerID: id, firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    password: password};
    return this.http.post(`${this.apiUrl}/AddUpdatePassengers`, body).pipe(
      tap((response: any) => {
        if (response.result && response.data) {
          console.log(response.data);

        }
      })
    );
  }
}
