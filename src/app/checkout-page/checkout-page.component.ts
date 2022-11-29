import { Component, OnInit } from '@angular/core';
import { FlightResponse } from '../model/flight-response.model';
import { FlightSearchService } from '../services/flight-search/flight-search-service';
import { Router } from '@angular/router';
import { TransactionRequest } from '../model/transaction-request.model';
import { TransactionServie } from '../services/transaction/transaction-service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  passengerCount : number = 0;
  returnPassengerCount : number = 0;
  flightResponse : FlightResponse;
  returnlightResponse : FlightResponse;
  flightNumber : String;
  flightSource : String;
  flightDestination : String;
  flightId : String;
  returnFlightId : String;
  flightIdList : Array<String>;
  hotelId : String;
  flightPresent : Boolean = false;
  returnFlightPresent : Boolean = false;
  hotelPresent : Boolean = false;
  totalPrice : number = 0;
  tax : number = 0;
  count : number = 0;
  userId : any;


  constructor( public flightSearchService : FlightSearchService, public router: Router, public transactionService : TransactionServie) { 
    this.flightId = sessionStorage.getItem("travelFlightId");
    if(this.flightId != null){
      this.flightPresent = true;
      this.passengerCount = 1;
      this.count++;
      this.flightSearchService.getFlightDetails(this.flightId).subscribe(response =>{
        console.log(response);
        this.flightResponse = response;
        this.totalPrice += this.flightResponse.price;
        this.tax = this.totalPrice * 0.0825;
      });
    }
    this.returnFlightId = sessionStorage.getItem("retrunFlightId");
    if(this.returnFlightId != null){
      this.returnFlightPresent = true;
      this.returnPassengerCount = 1;
      this.count++;
      this.flightSearchService.getFlightDetails(this.returnFlightId).subscribe(response =>{
        this.returnlightResponse = response;
        this.totalPrice += this.returnlightResponse.price;
        this.tax = this.totalPrice * 0.0825;
      });
    }
    // this.flightId = sessionStorage.getItem("hotelId");
    // if(this.flightId != null){
    //   this.flightPresent = true;
    //   this.flightSearchService.getFlightDetails(this.flightId).subscribe(response =>{
    //     this.flightResponse = response;
    //   });
    // }
  }

  passengerSubmit(){
    if(this.passengerCount != null){
      console.log("passengers:", this.passengerCount);
      this.totalPrice -= this.flightResponse.price;
      this.flightResponse.price = this.flightResponse.price * this.passengerCount;
      this.totalPrice += this.flightResponse.price;
      this.tax = this.totalPrice * 0.0825;
    }
  }

  returnPassengerSubmit(){
    if(this.returnPassengerCount != null){
      console.log("Return passengers:", this.returnPassengerCount);
      this.totalPrice -= this.returnlightResponse.price;
      this.returnlightResponse.price = this.returnlightResponse.price * this.returnPassengerCount;
      this.totalPrice += this.returnlightResponse.price;
      this.tax = this.totalPrice * 0.0825;
    }
  }

  submit(){
    this.userId = sessionStorage.getItem('id');
    let transactionRequest = new TransactionRequest(this.userId,this.flightId,this.passengerCount,this.returnFlightId,this.returnPassengerCount,this.totalPrice,this.tax,null,this.totalPrice+this.tax);
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
