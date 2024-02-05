import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  passengerId: number | null = null;
  bookings: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookingsService: BookingService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.passengerId =+  params['passengerId'];
      this.loadBookings();
    });
  }

  loadBookings(): void {
  console.log(this.passengerId);
  if (this.passengerId) {
    this.bookingsService.getBookingsByPassengerId(this.passengerId)
      .subscribe(
        (data) => {
          console.log(data);
          // Ensure data is an array
          this.bookings = Array.isArray(data) ? data : [data];
          console.log(this.bookings);
        },
        (error) => {
          console.error('Error loading bookings:', error);
        }
      );
  }
}
}
