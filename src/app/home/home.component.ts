import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { FlightSearchService } from '../services/flight-search/flight-search-service';
import { FlightResponse } from 'src/app/model/flight-response.model';
import { FlightSearchList } from 'src/app/model/flight-search-list.model';
import { MatTableDataSource } from '@angular/material/table';
import { FlightSearchRequest } from '../model/flight-search-request.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  checkBox = this.formBuilder.group({
    return: false,
  });
  sourceControl = new FormControl('');
  destinationControl = new FormControl('');
  startDate = new FormControl('');
  retrunDate = new FormControl('');
  options1: string[] = ['Chandigarh', 'Delhi', 'Mumbai', 'Austin', 'Dallas', 'Houston'];
  options2: string[] = ['Chandigarh', 'Delhi', 'Mumbai', 'Austin', 'Dallas', 'Houston'];
  filteredOptions1: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  flightSearchResponse : FlightSearchList;
  flightsList : Array<FlightResponse>;
  returnFlightsList : Array<FlightResponse>;
  areFlightsAvailable : boolean = false;
  areReturnFlightsAvailable : boolean = false;
  returnFlightsRequired : boolean = false;
  onSearchClick : boolean = false;
  dataSource : any;
  flightSearchRequest : FlightSearchRequest;
  firstName : string;

  constructor(public flightSearchService : FlightSearchService,  public router: Router, private formBuilder : FormBuilder) {
   }

  ngOnInit() {
    this.filteredOptions1 = this.sourceControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter1(value || '')),
    );
    this.filteredOptions2 = this.destinationControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value || '')),
    );
  }

  displayedColumns: any[] = ['flight_number', 'Airline', 'flight_type', 'source', 'destination', 'arrival_time','depart_time', 'rating', 'cost','button'];
  search(){
    this.onSearchClick = true;
    this.areFlightsAvailable = false;
    this.returnFlightsRequired = false;
    console.log(this.sourceControl.value);
    console.log(this.destinationControl.value);
    console.log(this.startDate.value);
    console.log(this.retrunDate.value);
    console.log(this.checkBox.value.return)
    this.flightSearchRequest = new FlightSearchRequest(this.sourceControl.value, this.destinationControl.value,this.startDate.value,this.retrunDate.value, this.checkBox.value.return);
    this.flightSearchService.getFlightsList(this.flightSearchRequest).subscribe(response =>{
      this.flightSearchResponse = response;
        console.log(this.flightSearchResponse);
        if(this.flightSearchResponse == null || this.flightSearchResponse.flightList.length==0){
          this.areFlightsAvailable = false;
        }else{
          this.flightsList = this.flightSearchResponse.flightList;
          this.dataSource = new MatTableDataSource(this.flightsList);
          this.areFlightsAvailable = true;
          if(this.checkBox.value.return){
            if(this.flightSearchResponse.returnFlightList.length == 0){
              this.areReturnFlightsAvailable = false;
            } else{
              this.returnFlightsList = this.flightSearchResponse.returnFlightList;
            }
          }
        }
      });
  }

  btnClick(value: string){
    sessionStorage.setItem("travelFlightId", value);
    if(this.checkBox.value.return){
      this.dataSource = new MatTableDataSource(this.returnFlightsList);
      this.areFlightsAvailable = false;
      this.returnFlightsRequired = true;
    } else{
      this.router.navigate(['/checkout']);
    }
  }

  returnBtnClick(value: string){
    sessionStorage.setItem("retrunFlightId", value);
    console.log(sessionStorage.getItem("travelFlightId"));
    console.log(sessionStorage.getItem("retrunFlightId"));
    this.firstName = sessionStorage.getItem('id');
    if(this.firstName == null){
      this.router.navigate(['/login']);
    } else{
      this.router.navigate(['/checkout']);
    }
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
