import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, OperatorFunction} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FlightSearchService } from '../services/flight-search/flight-search-service';
import { FlightResponse } from 'src/app/model/flight-response.model';
import { FlightSearchList } from 'src/app/model/flight-search-list.model';
import { MatTableDataSource } from '@angular/material/table';
import { FlightSearchRequest } from '../model/flight-search-request.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  destinationControl = new FormControl('');
  startDate = new FormControl('');
  retrunDate = new FormControl('');
  options1: string[] = ['One', 'Two', 'Three'];
  options2: string[] = ['One', 'Two', 'Three'];
  filteredOptions1: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  flightSearchResponse : FlightSearchList;
  flightsList : Array<FlightResponse>;
  returnFlightsList : Array<FlightResponse>;
  areFlightsAvailable : boolean = false;
  dataSource : any;
  flightSearchRequest : FlightSearchRequest;

  constructor(public flightSearchService : FlightSearchService) { }

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
    console.log(this.sourceControl.value);
    console.log(this.destinationControl.value);
    console.log(this.startDate.value);
    console.log(this.retrunDate.value);
    this.flightSearchRequest = new FlightSearchRequest(this.sourceControl.value, this.destinationControl.value,this.startDate.value,this.retrunDate.value,false);
    this.flightSearchService.getFlightsList(this.flightSearchRequest).subscribe(response =>{
      this.flightSearchResponse = response;
        console.log(this.flightSearchResponse);
        if(this.flightSearchResponse == null){
          this.areFlightsAvailable = false;
        }else{
          this.flightsList = this.flightSearchResponse.flightList;
          this.dataSource = new MatTableDataSource(this.flightsList);
          this.returnFlightsList = this.flightSearchResponse.returnFlightList;
          this.areFlightsAvailable = true;
        }
      });
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
