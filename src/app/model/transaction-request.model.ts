export class TransactionRequest{
    userId : number;
    flightId : number;
    flightPassengers : number;
    returnFlightId : number;
    returnFlightPassengers : number;
    hotelRoomId : number;
    numberOfHotelRooms : number;
    checkInDate : Date;
    checkOutDate : Date;
    price : number;
    taxPrice : number;
    promoCode : number;
    paidPrice : number;

    constructor(userId, flightId, flightPassengers, returnFlightId, returnFlightPassengers, hotelRoomId, numberOfHotelRooms, checkInDate, checkOutDate, price, taxPrice, promoCode, paidPrice){
        this.userId = userId;
        this.flightId = flightId;
        this.flightPassengers = flightPassengers;
        this.returnFlightId =  returnFlightId;
        this.returnFlightPassengers = returnFlightPassengers;
        this.hotelRoomId = hotelRoomId;
        this.numberOfHotelRooms = numberOfHotelRooms;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.price = price;
        this.taxPrice =  taxPrice;
        this.promoCode = promoCode;
        this.paidPrice = paidPrice;
    }
}