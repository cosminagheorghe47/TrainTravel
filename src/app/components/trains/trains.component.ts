import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';  

@Component({
  selector: 'app-trains',
  templateUrl: './trains.component.html',
  styleUrls: ['./trains.component.css']
})
export class TrainsComponent implements OnInit {
  trainResults: any[] = [];
  departure: string | null = null;
  arrival: string | null = null;
  date: string | null = null;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const results = params['results'];
      this.departure = params['departure'];
      this.arrival = params['arrival'];
      this.date = params['date'];

      if (results) {
        this.trainResults = JSON.parse(results);
      }

      console.log('Departure:', this.departure);
      console.log('Arrival:', this.arrival);
      console.log('Date:', this.date);

      console.log('Train Results:', this.trainResults);
    });
  }

  isAuthenticated(): boolean {
    return this.authService.getCurrentUser() !== null;
  }

  bookTrain(train: any): void {
    this.router.navigate(['/bookings']);
  }
}
