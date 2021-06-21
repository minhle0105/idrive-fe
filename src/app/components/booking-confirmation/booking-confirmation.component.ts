import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderDetail} from '../../model/order-detail';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css']
})
export class BookingConfirmationComponent implements OnInit {

  ownerName;
  ownerEmail;
  totalPrice;
  startDate;
  endDate;
  vehicleBrand;
  vehicleDescription;
  vehicleLocation;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  viewInvoice() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.ownerName = params.ownerName;
      this.ownerEmail = params.ownerEmail;
      this.totalPrice = params.totalPrice;
      this.startDate = params.startDate;
      this.endDate = params.endDate;
      this.vehicleBrand = params.vehicleBrand;
      this.vehicleDescription = params.vehicleDescription;
      this.vehicleLocation = params.vehicleLocation;
      this.router.navigate(['invoice'], {queryParams: {ownerName: this.ownerName, ownerEmail: this.ownerEmail, totalPrice: this.totalPrice, startDate: this.startDate, endDate: this.endDate  , vehicleBrand: this.vehicleBrand, vehicleDescription: this.vehicleDescription, vehicleLocation: this.vehicleLocation}});
    })

  }

}
