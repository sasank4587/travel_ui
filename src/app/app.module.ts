import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlightSearchComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { LoginPageComponent } from './login-page/login-page.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { UserPaymentPageComponent } from './user-payment-page/user-payment-page.component';
import { HotelsSearchComponent } from './hotels-search/hotels-search.component';
import {NgbPaginationModule, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { FlightsHotelsComponent } from './flights-hotels/flights-hotels.component';
import { TravelHomeComponent } from './travel-home/travel-home.component';
import { DealsSearchComponent } from './deals-search/deals-search.component';
import { DealsCartComponent } from './deals-cart/deals-cart.component';
import { UserDealsComponent } from './user-deals/user-deals.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FlightSearchComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    CheckoutPageComponent,
    UserProfilePageComponent,
    UserPaymentPageComponent,
    HotelsSearchComponent,
    BookingHistoryComponent,
    FlightsHotelsComponent,
    TravelHomeComponent,
    DealsSearchComponent,
    DealsCartComponent,
    UserDealsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatTableModule,
    NgbModule,
    NgbAlertModule,
    NgbPaginationModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
