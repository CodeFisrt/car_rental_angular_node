import { Component } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent {

  bookings: any[] = [];
  bookingObj: any = {
    user:'',
    vehicleId: '',
    sDate: '',
    eDate: '',
    price: 0,
    discount: 0


  };

  constructor(private bookingService: BookingService, private authService: AuthService) {}

  ngOnInit(): void {
    if(this.authService.user?.role == 'admin') {
      this.getAllBooking();
    } else {
      this.getBookings();
    }
    
  }

  getAllBooking() {
    debugger;
    this.bookingService.getAllBooking().subscribe(
      (result: any) => {
        this.bookings = result;
      },
      (error: any) => {
       alert('Error fetching bookings:');
      }
    )
  }

  getBookings() {
    debugger;
    const userId = this.authService.user?.id;
    if (userId) {
      this.bookingService.getBookingsByUserId(userId).subscribe(
        (result: any) => {
          this.bookings = result;
        },
        (error: any) => {
         alert('Error fetching bookings:');
        }
      );
    } else {
     alert('No user found');
    }
  }


  createBooking() {
    const user = this.authService.user;
    this.bookingService.saveBooking(
      this.bookingObj.vehicleId,
      this.bookingObj.sDate,
      this.bookingObj.eDate,
      this.bookingObj.price,
      this.bookingObj.discount 
    ).subscribe(
      (response: any) => {
        alert('Booking created successfully');
        this.getBookings();
      },
      (error: any) => {
       alert('Error creating booking');
      }
    );
  }

  deleteBooking(bookingId: string) {
    this.bookingService.deleteBoooking(bookingId).subscribe(
      (response: any) => {
        alert('Booking deleted successfully');
        this.getBookings();
      },
      (error: any) => {
        alert('Error deleting booking');
      }
    );
  }
}
