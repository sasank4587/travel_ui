import { Component, OnInit } from '@angular/core';
import { FlightResponse } from '../model/flight-response.model';
import { FlightSearchService } from '../services/flight-search/flight-search-service';
import { Router } from '@angular/router';
import { TransactionRequest } from '../model/transaction-request.model';
import { TransactionServie } from '../services/transaction/transaction-service';
import { HotelSearchRequest } from '../model/hotel-search-request.model';
import { HotelSearchService } from '../services/hotels/hotel-service';
import { HotelRoomResponse } from '../model/hotel-room-response.model';
import { HotelResponse } from '../model/hotel-response.model';
import { HotelSearchResponse } from '../model/hotel-search-response.model';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  passengerCount: number = 0;
  returnPassengerCount: number = 0;
  hotelRoomsCount : number = 0;
  flightResponse: FlightResponse;
  returnlightResponse: FlightResponse;
  hotelResponse : HotelResponse;
  flightNumber: String;
  flightSource: String;
  flightDestination: String;
  flightId: any;
  returnFlightId: any;
  flightIdList: Array<String>;
  hotelId: any;
  hotelCheckInDate: string;
  hotelCheckOutDate: string;
  flightPresent: Boolean = false;
  returnFlightPresent: Boolean = false;
  hotelPresent: Boolean = false;
  totalPrice: number = 0;
  tax: number = 0;
  count: number = 0;
  userId: any;
  flightTicketPrice : number;
  returnFlightTicketPrice : number;
  hotelRoomPrice : number;


  constructor(public flightSearchService: FlightSearchService, public hotelSearchService : HotelSearchService, public router: Router, public transactionService: TransactionServie) {
    this.flightId = sessionStorage.getItem("travelFlightId");
    if (this.flightId != null) {
      this.flightPresent = true;
      this.passengerCount = 1;
      this.count++;
      this.flightSearchService.getFlightDetails(this.flightId).subscribe(response => {
        console.log(response);
        this.flightResponse = response;
        this.flightTicketPrice = this.flightResponse.price * this.passengerCount;
        this.totalPrice += this.flightTicketPrice;
        this.tax = this.totalPrice * 0.0825;
      });
    }
    this.returnFlightId = sessionStorage.getItem("retrunFlightId");
    if (this.returnFlightId != null) {
      this.returnFlightPresent = true;
      this.returnPassengerCount = 1;
      this.count++;
      this.flightSearchService.getFlightDetails(this.returnFlightId).subscribe(response => {
        this.returnlightResponse = response;
        this.returnFlightTicketPrice = this.returnlightResponse.price * this.returnPassengerCount;
        this.totalPrice += this.returnFlightTicketPrice;
        this.tax = this.totalPrice * 0.0825;
      });
    }
    this.hotelId = sessionStorage.getItem("hotelRoomId");
    if (this.hotelId != null) {
      this.hotelCheckInDate = sessionStorage.getItem("hotelcheckInDate");
      this.hotelCheckOutDate = sessionStorage.getItem("hotelRoomOutDate");
      this.hotelPresent = true;
      this.hotelRoomsCount = 1;
      this.count++;
      this.hotelSearchService.getHotelDetails(this.hotelId).subscribe(response => {
        this.hotelResponse = response;
        this.hotelRoomPrice = this.hotelResponse.hotelRoomsList[0].price * this.hotelRoomsCount;
        this.totalPrice += this.hotelRoomPrice;
        this.tax = this.totalPrice * 0.0825;
      });
    }
  }

  passengerSubmit() {
    if (this.passengerCount != null) {
      console.log("passengers:", this.passengerCount);
      this.totalPrice -= this.flightTicketPrice;
      this.flightTicketPrice = this.flightResponse.price * this.passengerCount;
      this.totalPrice += this.flightTicketPrice;
      this.tax = this.totalPrice * 0.0825;
    }
  }

  returnPassengerSubmit() {
    if (this.returnPassengerCount != null) {
      console.log("Return passengers:", this.returnPassengerCount);
      this.totalPrice -= this.returnFlightTicketPrice;
      this.returnFlightTicketPrice = this.returnlightResponse.price * this.returnPassengerCount;
      this.totalPrice += this.returnFlightTicketPrice;
      this.tax = this.totalPrice * 0.0825;
    }
  }

  hotelPassengerSubmit() {
    if (this.hotelRoomsCount != null) {
      console.log("Hotel passengers:", this.hotelRoomsCount);
      this.totalPrice -= this.hotelRoomPrice;
      this.hotelRoomPrice = this.hotelResponse.hotelRoomsList[0].price * this.hotelRoomsCount;
      this.totalPrice += this.hotelRoomPrice;
      this.tax = this.totalPrice * 0.0825;
    }
  }

  submit() {
    this.userId = sessionStorage.getItem('id');
    let transactionRequest = new TransactionRequest(this.userId, this.flightId, this.passengerCount, this.returnFlightId, this.returnPassengerCount, this.totalPrice, this.tax, null, this.totalPrice + this.tax);
    this.transactionService.postTransactions(transactionRequest).subscribe((successData) => {
      this.router.navigate(['/home']);
      sessionStorage.removeItem("travelFlightId");
      sessionStorage.removeItem("retrunFlightId");
      console.log(successData)
    });
  }


  ngOnInit(): void {
  }

}
