import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

import { PromoResponse } from 'src/app/model/promo-response.model';
import { PromoSearchResponse } from 'src/app/model/promo-list-response.model';
import { PromoSearchRequest } from 'src/app/model/promo-code-search-request.model';
import { PromoService } from '../services/promo-service/promo-service-search';

@Component({
  selector: 'app-deals-search',
  templateUrl: './deals-search.component.html',
  styleUrls: ['./deals-search.component.css']
})
export class DealsSearchComponent implements OnInit {


  sourceControl = new FormControl('');
  destinationControl = new FormControl('');
  startDate = new FormControl('');
  retrunDate = new FormControl('');

  promoRequest : PromoSearchRequest;
  promoResponse : PromoResponse;
  promoList : PromoSearchResponse;

  promosAvailable : boolean = false;
  onSearchClick : boolean = false;

  options1: string[] = ['Chandigarh', 'Delhi', 'Mumbai', 'Austin', 'Dallas', 'Houston'];
  options2: string[] = ['Chandigarh', 'Delhi', 'Mumbai', 'Austin', 'Dallas', 'Houston'];
  filteredOptions1: Observable<string[]>;
  filteredOptions2: Observable<string[]>;


  userId : string;


  constructor(public promoService : PromoService, public router : Router) { }

  search(){
    this.onSearchClick = true;
    console.log(this.sourceControl.value);
    console.log(this.destinationControl.value);
    console.log(this.startDate.value);
    console.log(this.retrunDate.value);
    this.promoRequest = new PromoSearchRequest(this.sourceControl.value, this.destinationControl.value, this.startDate.value, this.retrunDate.value, null, null);
    this.promoService.getPromos(this.promoRequest).subscribe(response => {
      console.log(response);
      this.promoList = response;
      console.log(this.promoList)
      if(this.promoList == null || this.promoList.promoCodeList == null || this.promoList.promoCodeList.length == 0){
         this.promosAvailable = false;
      } else{
        this.promosAvailable = true;
      }
    })
  }

  buyPromo(value : string){
    console.log(value);
    sessionStorage.setItem("promoId",value);
    this.userId = sessionStorage.getItem("id");
    if(this.userId == null){
      this.router.navigate(['/login']);
    } else{
      this.router.navigate(['/deals-cart']);
    }
  }

  ngOnInit(): void {
    this.filteredOptions1 = this.sourceControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter1(value || '')),
    );
    this.filteredOptions2 = this.destinationControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value || '')),
    );
  }


  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options1.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options2.filter(option => option.toLowerCase().includes(filterValue));
  }

}
