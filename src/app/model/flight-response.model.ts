import { Time } from "@angular/common";

export class FlightResponse{
    id : number;
    price : number;
    flightNumber : String;
    airlinesName : String;
    flightType : String;
    flightRating : number;
    sourceCity : string;
    destinationCity : String;
    logo : String;
    startDate : Date;
    endDate : Date;
    startTime : Time;
    endTime : Time;

    constructor(id, flightNumber, airlinesName, flightType, flightRating, sourceCity, destinationCity, price, startDate, endDate, startTime, endTime, logo){
        this.id = id;
        this.flightNumber = flightNumber;
        this.airlinesName = airlinesName;
        this.flightType = flightType;
        this.flightRating =  flightRating;
        this.sourceCity = sourceCity;
        this.destinationCity = destinationCity;
        this.price = price;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.logo = logo;
    }
}