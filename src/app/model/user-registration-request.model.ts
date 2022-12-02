export class UserRegistrationRequest{
    firstName : string;
    lastName : string;
    phoneNumber : string;
    emailId : string;
    userAddress : string;
    userName : string;
    password : string;
    cardNumber : string;
    nameOnTheCard : string;
    expiryDate : Date;
    securityCode : string;
    isDefault : boolean;

    constructor(username, firstName, lastName, email, userAddress, contactNum, password, cardNumber, nameOntheCard, expiryDate, securityCode, isDefault){
        this.userName = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId =  email;
        this.userAddress = userAddress;
        this.phoneNumber = contactNum;
        this.password = password;
        this.cardNumber = cardNumber;
        this.nameOnTheCard = nameOntheCard;
        this.expiryDate = expiryDate;
        this.securityCode = securityCode;
        this.isDefault = isDefault;
    }
}