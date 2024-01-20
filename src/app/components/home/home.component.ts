// home.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StationService } from '../../services/station.service';
import { SearchComponent } from '../search/search.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData: any;
  stations$!: Observable<any[]>; 
  constructor(private authService: AuthService,private stationsService: StationService) {}

  ngOnInit() {
    
    this.authService.currentUser$.subscribe(user => {
      this.userData = user;
    });
    this.stations$ = this.stationsService.getStations().pipe(map(response => response.data));
  }
  onLogout() {
    
    this.authService.logout();
  }
}
