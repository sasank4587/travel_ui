import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../services/user-profile/user-profile.service';
import { UserProfile } from '../model/UserProfile.model';

import { Router } from '@angular/router';

import { PromoResponse } from 'src/app/model/promo-response.model';
import { PromoSearchResponse } from 'src/app/model/promo-list-response.model';
import { PromoSearchRequest } from 'src/app/model/promo-code-search-request.model';
import { PromoService } from '../services/promo-service/promo-service-search';
import { AddPromoRequest } from '../model/add-promo-request.model';

@Component({
  selector: 'app-deals-cart',
  templateUrl: './deals-cart.component.html',
  styleUrls: ['./deals-cart.component.css']
})
export class DealsCartComponent implements OnInit {

  id: string;
  profileDetails: UserProfile;
  isUserExists: boolean = false;
  userMileage: number;

  promoRequest: PromoSearchRequest;
  promoResponse: PromoResponse;
  promoList: PromoSearchResponse;
  promoId: any;

  userPromoList : Array<PromoResponse>;

  isReedemable : boolean = false;

  count: number = 0;
  totalPrice : number = 0;
  finalPrice : number = 0;
  tax : number = 0;
  isPromoPresent: boolean = false;

  addPromoRequest : AddPromoRequest;

  constructor(public profileService: UserProfileService, public promoService: PromoService, public router : Router) {
    this.id = sessionStorage.getItem('id');
    this.profileService.getProfileDetails(this.id).subscribe(response => {
      this.profileDetails = response;
      console.log(this.profileDetails);
      if (this.profileDetails == null) {
        this.isUserExists = false;
      } else {
        this.isUserExists = true;
        this.userMileage = this.profileDetails.travelMileage;
      }
    });
    this.promoId = sessionStorage.getItem("promoId");
    if (this.promoId != null) {
      promoService.getPromoDetails(this.promoId).subscribe(response => {
        console.log(response);
        this.promoResponse = response;
        if (this.promoResponse != null) {
          if(this.isUserExists && this.userMileage>this.promoResponse.mileage){
            this.isReedemable = true;
            console.log(this.isReedemable);
          }
          this.totalPrice = this.promoResponse.price;
          this.tax = this.totalPrice * 0.15;
          this.finalPrice = this.totalPrice+this.tax;
          this.isPromoPresent = true;
          this.count++;
        }
      })
    }
    if(this.promoResponse != null && this.isUserExists && this.userMileage>this.promoResponse.mileage){
      this.isReedemable = true;
      console.log(this.isReedemable);
    }
    if(this.promoResponse != null && this.isUserExists && this.userMileage>this.promoResponse.mileage){
      this.isReedemable = true;
      console.log(this.isReedemable);
    }
    if(this.promoResponse != null && this.isUserExists && this.userMileage>this.promoResponse.mileage){
      this.isReedemable = true;
      console.log(this.isReedemable);
    }
  }

  redeem(){
    console.log(this.profileDetails.id);
    console.log(this.promoId);
    console.log("redeem")
    this.addPromoRequest = new AddPromoRequest(this.profileDetails.id, this.promoId, "redeem");
    this.promoService.addPromo(this.addPromoRequest).subscribe(response => {
      console.log(response);
      this.userPromoList = response;
      this.router.navigate(['/home']);
    })
  }

  submit(){
    console.log(this.profileDetails.id);
    console.log(this.promoId);
    console.log("card")
    this.addPromoRequest = new AddPromoRequest(this.profileDetails.id, this.promoId, "card");
    this.promoService.addPromo(this.addPromoRequest).subscribe(response => {
      console.log(response);
      this.userPromoList = response;
    })
  }

  ngOnInit(): void {
  }

}
