import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {SearchResultComponent} from './components/search-result/search-result.component';
import {DetailedInfoComponent} from './components/detailed-info/detailed-info.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DashboardBookingsComponent} from './components/dashboard/dashboard-bookings/dashboard-bookings.component';
import {AddVehicleComponent} from './components/vehicle/add-vehicle/add-vehicle.component';
import {VehicleListComponent} from './components/vehicle/vehicle-list/vehicle-list.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {UpdateVehicleComponent} from './components/vehicle/update-vehicle/update-vehicle.component';
import {SigninComponent} from "./components/signin/signin.component";
import {SignupComponent} from "./components/signup/signup.component";
import {BookingConfirmationComponent} from './components/booking-confirmation/booking-confirmation.component';
import {InvoiceComponent} from './components/invoice/invoice.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'sign-in',
    component: SigninComponent
  },
  {
    path: 'sign-up',
    component: SignupComponent
  },
  {
    path: 'search-result',
    component: SearchResultComponent
  },
  {
    path: 'car-detail',
    component: DetailedInfoComponent
  },
  {
    path: 'dashboard',
    component: VehicleListComponent
  },
  {
    path: 'dashboard_bookings',
    component: DashboardBookingsComponent,
  },
  {
    path: 'add-vehicle',
    component: AddVehicleComponent
  },
  {
    path: 'listings',
    component: VehicleListComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'booking-confirmation',
    component: BookingConfirmationComponent
  },
  {
    path: 'edit-listing/:id',
    component: UpdateVehicleComponent
  },
  {
    path: 'invoice',
    component: InvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
