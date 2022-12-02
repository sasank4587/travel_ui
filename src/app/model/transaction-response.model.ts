import { FlightResponse } from "./flight-response.model";
import { UserProfile } from "./UserProfile.model";

export class TransactionResponse{
    transactionId : number;
    userProfileResponse : UserProfile;
    totalCost : number;
    tax : number;
    numberOfPassengers : number;
    totalCostPaid : number;
    flight : boolean;
    returnFlight : boolean;
    hotel : boolean;
    flightResponse : FlightResponse;
    transactionDate: Date;
    returnFlightResponse : FlightResponse

    constructor(transactionId, userProfileResponse, totalCost, tax, numberOfPassengers, totalCostPaid, isFlight, isReturnFlight, isHotel, flightResponse, transactionDate, returnFlightResponse){
        this.transactionId = transactionId;
        this.userProfileResponse = userProfileResponse;
        this.totalCost = totalCost;
        this.tax =  tax;
        this.numberOfPassengers = numberOfPassengers;
        this.totalCostPaid = totalCostPaid;
        this.flight = isFlight;
        this.returnFlight = isReturnFlight;
        this.hotel = isHotel;
        this.flightResponse = flightResponse;
        this.transactionDate = transactionDate;
        this.returnFlightResponse = returnFlightResponse;
    }
}