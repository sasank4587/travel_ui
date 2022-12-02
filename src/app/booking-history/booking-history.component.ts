import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { TransactionServie } from '../services/transaction/transaction-service';
import { TransactionResponse } from '../model/transaction-response.model';
import { TransactionHistory } from '../model/transaction-history.model';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
  panelOpenState = false;
  transactionHistory : TransactionHistory;
  firstName : string;
  lastName : string;
  profileName : string;
  transactionResponseList : Array<TransactionResponse>;
  userId : any;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(public transactionService : TransactionServie) {
    this.userId = sessionStorage.getItem("id");
    this.firstName = sessionStorage.getItem("firstName");
    this.lastName = sessionStorage.getItem("lastName");
    this.profileName = this.firstName+this.lastName;
    transactionService.getHistory(this.userId).subscribe(response =>{
      console.log(response);
      this.transactionHistory = response;
      this.transactionResponseList = this.transactionHistory.transactionResponses;
    });
   }
  ngOnInit(): void {
  }

}
