import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BookingService } from '../../services/booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  trainId: string | null = null;
  currentUser: any; // Change the type as per your UserData interface
  bookingForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private bookingService: BookingService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.bookingForm = this.fb.group({
      // Define your form controls here
      passengerName: ['', Validators.required],
      age: ['', Validators.required],
      // Add more controls as needed
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.trainId = params['trainId'];
    });

    this.currentUser = this.authService.getCurrentUser();
  }

  book(): void {
    if (this.bookingForm.valid) {
      const bookingData = {
        bookingId: 47,
        trainId: this.trainId,
        passengerId: this.currentUser.passengerID,
        travelDate: new Date().toISOString(), 
        bookingDate: new Date().toISOString(),
        totalSeats: 1, 
        TrainAppBookingPassengers: [{
          bookingPassengerId: this.currentUser.passengerID,
          bookingId: 47,
          passengerName: this.bookingForm.value.passengerName,
          seatNo: 12,
          age: this.bookingForm.value.age,
        }]
      };

      this.bookingService.bookTrain(bookingData).subscribe(
        response => {
          // Handle success, e.g., show a success message
          console.log('Booking successful:', response);
          this.openSnackBar('Booking successful', 'Close');
        },
        error => {
          // Handle error, e.g., show an error message
          console.error('Booking failed:', error);
          this.openSnackBar('Booking failed', 'Close');
        }
      );
    } else {
      // Form is not valid, handle accordingly
      console.error('Invalid form');
    }
  }
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
