import { Component, OnInit } from '@angular/core';
import { UserPaymentMethods } from '../model/user-payment-methods.model';
import { UserProfileService } from '../services/user-profile/user-profile.service';

@Component({
  selector: 'app-user-payment-page',
  templateUrl: './user-payment-page.component.html',
  styleUrls: ['./user-payment-page.component.css']
})
export class UserPaymentPageComponent implements OnInit {

  userId : any;
  userPaymentMethods : Array<UserPaymentMethods>;

  constructor(public service : UserProfileService) { 
    this.userId = sessionStorage.getItem('id');
    service.getPaymentMethods(this.userId).subscribe(response => {
      console.log(response);
      this.userPaymentMethods = response;
      console.log(this.userPaymentMethods);
    })
  }

  makeDefault(value){
    console.log(this.userId)
    console.log(value);
    this.service.makeDefault(this.userId, value).subscribe(response => {
      console.log(response);
      this.userPaymentMethods = response;
      console.log(this.userPaymentMethods);
    })
  }

  ngOnInit(): void {
  }

}
