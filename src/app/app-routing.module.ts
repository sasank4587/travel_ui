import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightSearchComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { UserPaymentPageComponent } from './user-payment-page/user-payment-page.component';
import { HotelsSearchComponent } from './hotels-search/hotels-search.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { FlightsHotelsComponent } from './flights-hotels/flights-hotels.component';
import { TravelHomeComponent } from './travel-home/travel-home.component';
import { DealsSearchComponent } from './deals-search/deals-search.component';
import { DealsCartComponent } from './deals-cart/deals-cart.component';
import { UserDealsComponent } from './user-deals/user-deals.component';

const routes: Routes = [
  {path : "" , redirectTo : "flight", pathMatch : "full"},
  {path : "login", component : LoginPageComponent},
  {path : "hotel", component : HotelsSearchComponent},
  {path : "checkout", component : CheckoutPageComponent},
  {path : "profile", component : UserProfilePageComponent},
  {path : "payment-methods", component : UserPaymentPageComponent},
  {path : "register", component : RegistrationPageComponent},
  {path : "history", component : BookingHistoryComponent},
  {path : "flighthotel", component : FlightsHotelsComponent},
  {path : "home", component : TravelHomeComponent},
  {path : "flight", component : FlightSearchComponent},
  {path : "deals" , component : DealsSearchComponent},
  {path : "deals-cart", component : DealsCartComponent},
  {path : "user-deals", component : UserDealsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
