import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Vehicle} from '../../model/vehicle';
import {VehicleService} from '../../service/vehicle/vehicle.service';
import {OrderDetailService} from '../../service/order-detail.service';
import {OrderDetail} from '../../model/order-detail';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  lengthOfRental: number = -1;
  vehicleId: number = -1;
  vehicleToCheckout: Vehicle = {};
  startDate;
  endDate;
  orderDetail: OrderDetail = {};

  constructor(private activatedRoute: ActivatedRoute,
              private vehicleService: VehicleService,
              private router: Router,
              private orderDetailService: OrderDetailService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.lengthOfRental = +params.totalDate;
      this.vehicleId = +params.vehicleId;
      this.getVehicleById(this.vehicleId);
      this.startDate = params.startDate;
      this.endDate = params.endDate;
    })
  }

  getVehicleById(id) {
    this.vehicleService.findById(this.vehicleId).subscribe(v => {
      this.vehicleToCheckout = v;
    })
  }

  saveOrderDetails() {
    this.vehicleService.findById(this.vehicleId).subscribe(v => {
      this.vehicleToCheckout = v;
      this.orderDetail.vehicle = this.vehicleToCheckout;
      this.orderDetail.totalPrice = this.lengthOfRental * this.vehicleToCheckout.price;
      this.orderDetail.startTime = new Date(this.startDate);
      this.orderDetail.endTime = new Date(this.endDate);
      this.orderDetail.own = this.vehicleToCheckout.owner;
      this.orderDetail.renter = {
        userId: 2
      };
      this.orderDetailService.save(this.orderDetail).subscribe(() => {
        this.router.navigate(['booking-confirmation'], {queryParams: {ownerName: this.orderDetail.own.fullName, ownerEmail: this.orderDetail.own.email, totalPrice: this.orderDetail.totalPrice, startDate: this.orderDetail.startTime, endDate: this.orderDetail.endTime, vehicleBrand: this.orderDetail.vehicle.brand, vehicleDescription: this.orderDetail.vehicle.description, vehicleLocation: this.orderDetail.vehicle.location}});
      });
    })

  }


}
