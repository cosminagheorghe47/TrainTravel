// auth.service.ts
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
  private apiUrl = 'https://freeapi.miniprojectideas.com/api/TrainApp';
  private currentUserSubject: BehaviorSubject<UserData | null> = new BehaviorSubject<UserData | null>(null);

  currentUser$: Observable<UserData | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

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

          // Store user data in BehaviorSubject
          this.currentUserSubject.next(userData);
        }
      })
    );
  }

  logout() {
    // Clear user data
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
          // const userData: UserData = {
          //   passengerID: response.data.passengerID,
          //   firstName: response.data.firstName,
          //   lastName: response.data.lastName,
          //   email: response.data.email,
          //   phone: response.data.phone,
          // };

          // Store user data in BehaviorSubject
          //this.currentUserSubject.next(userData);
        }
      })
    );
  }
  // Implement other authentication-related functions if needed
}
