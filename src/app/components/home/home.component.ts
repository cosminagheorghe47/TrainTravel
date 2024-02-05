// home.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StationService } from '../../services/station.service';
import { SearchComponent } from '../search/search.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  userData: any;
  stations$!: Observable<any[]>; 
  constructor(private authService: AuthService,private stationsService: StationService, private router: Router) {}

  ngOnInit() {
    this.authService.setBookingId('');
    this.authService.currentUser$.subscribe(user => {
      this.userData = user;
    });
    this.stations$ = this.stationsService.getStations().pipe(map(response => response.data));
  }
  onLogout() {
    
    this.authService.logout();
  }
  onMyBookings(){
    console.log(this.userData.passengerID);
    this.router.navigate(['/my-bookings', this.userData.passengerID]);
  }
  ngAfterViewInit() {
    this.initializeMap();
  }

  initializeMap() {
    // Set the initial display point to be in Romania
    const initialLocation: L.LatLngExpression = [45.9432, 24.9668]; // Latitude, Longitude

    const mymap = L.map('mapid').setView(initialLocation, 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mymap);

    // Add markers or other map features as needed
    // Example marker:
    L.marker(initialLocation).addTo(mymap).bindPopup('Hello from Romania!');
  }
}
