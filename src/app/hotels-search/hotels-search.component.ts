import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, OperatorFunction} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HotelSearchRequest } from '../model/hotel-search-request.model';
import { HotelSearchService } from '../services/hotels/hotel-service';
import { HotelRoomResponse } from '../model/hotel-room-response.model';
import { HotelResponse } from '../model/hotel-response.model';
import { HotelSearchResponse } from '../model/hotel-search-response.model';

const states = [
  'Alabama',
	'Alaska',
	'American Samoa',
	'Arizona'
];


@Component({
  selector: 'app-hotels-search',
  templateUrl: './hotels-search.component.html',
  styleUrls: ['./hotels-search.component.css']
})

export class HotelsSearchComponent implements OnInit {
  public model: any;

	formatter = (result: string) => result.toUpperCase();

	select: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			map((term) =>
				term === '' ? [] : states.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
			),
		);

  sourceControl = new FormControl('');
  franchiseControl = new FormControl('');
  startDate = new FormControl('');
  retrunDate = new FormControl('');
  options1: string[] = ['Chandigarh', 'Delhi', 'Mumbai', 'Austin', 'Dallas', 'Houston'];
  options2: string[] = ['Chandigarh', 'Delhi', 'Mumbai', 'Austin', 'Dallas', 'Houston'];
  filteredOptions1: Observable<string[]>;
  areHotelsAvailable : boolean = false;
  dataSource : any;
  hotelRoomResponseList : Array<HotelRoomResponse>;
  hotelList : Array<HotelResponse>;
  hotelSearchResponse : HotelSearchResponse;
  hotelSearchRequest : HotelSearchRequest;
  numberOfDays : any;
  

  constructor(public hotelSearchService : HotelSearchService, public router: Router) { }

  ngOnInit() {
    this.filteredOptions1 = this.sourceControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter1(value || '')),
    );
  }

  displayedColumns: any[] = ['flight_number', 'Airline', 'flight_type', 'source', 'destination', 'arrival_time','depart_time', 'rating', 'cost','button'];
  search(){
    console.log(this.sourceControl.value);
    console.log(this.startDate.value);
    console.log(this.retrunDate.value);
    this.hotelSearchRequest = new HotelSearchRequest(this.sourceControl.value,"",this.startDate.value,this.retrunDate.value);
    this.hotelSearchService.getHotels(this.hotelSearchRequest).subscribe(response =>{
      this.hotelSearchResponse = response;
        console.log(this.hotelSearchResponse);
        if(this.hotelSearchResponse == null){
          this.areHotelsAvailable = false;
        }else{
          this.hotelList = this.hotelSearchResponse.hotelResponseList;
          this.numberOfDays = this.hotelSearchResponse.numberOfDays;
          this.areHotelsAvailable = true;
        }
      });
  }

  btnClick(value : string){
    sessionStorage.setItem("hotelRoomId", value);
    sessionStorage.setItem("hotelcheckInDate", this.startDate.value);
    sessionStorage.setItem("hotelcheckOutDate", this.retrunDate.value);
    sessionStorage.setItem("hotelCheckInDays", this.numberOfDays);
    this.router.navigate(['/checkout']);
  }

  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options1.filter(option => option.toLowerCase().includes(filterValue));
  }
}
