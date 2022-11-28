import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { UserPaymentPageComponent } from './user-payment-page/user-payment-page.component';
import { HotelsSearchComponent } from './hotels-search/hotels-search.component';

const routes: Routes = [
  {path : "" , redirectTo : "home", pathMatch : "full"},
  {path : "login", component : LoginPageComponent},
  {path : "hotel", component : HotelsSearchComponent},
  {path : "checkout", component : CheckoutPageComponent},
  {path : "profile", component : UserProfilePageComponent},
  {path : "payment-methods", component : UserPaymentPageComponent},
  {path : "register", component : RegistrationPageComponent},
  {path : 'home', component : HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
