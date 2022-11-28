export class TransactionRequest{
    userId : number;
    flightId : number;
    flightPassengers : number;
    returnFlightId : number;
    returnFlightPassengers : number;
    price : number;
    taxPrice : number;
    promoCode : number;
    paidPrice : number;

    constructor(userId, flightId, flightPassengers, returnFlightId, returnFlightPassengers, price, taxPrice, promoCode, paidPrice){
        this.userId = userId;
        this.flightId = flightId;
        this.flightPassengers = flightPassengers;
        this.returnFlightId =  returnFlightId;
        this.returnFlightPassengers = returnFlightPassengers;
        this.price = price;
        this.taxPrice =  taxPrice;
        this.promoCode = promoCode;
        this.paidPrice = paidPrice;
    }
}