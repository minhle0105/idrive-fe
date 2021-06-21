import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Vehicle} from '../../model/vehicle';
import {VehicleService} from '../../service/vehicle/vehicle.service';
import {OrderDetailService} from '../../service/order-detail.service';
import {OrderDetail} from '../../model/order-detail';
import {User} from '../../model/user';
import {AuthService} from '../../service/auth.service';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  username: string;
  userId: number;
  user: User = {};
  isLoggedIn: boolean;

  lengthOfRental: number = -1;
  vehicleId: number = -1;
  vehicleToCheckout: Vehicle = {};
  startDate;
  endDate;
  orderDetail: OrderDetail = {};

  constructor(private activatedRoute: ActivatedRoute,
              private vehicleService: VehicleService,
              private router: Router,
              private orderDetailService: OrderDetailService,
              private authService: AuthService,
              private userService: UserService) {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.authService.userId.subscribe((data: number) => this.userId = data);
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.lengthOfRental = +params.totalDate;
      this.vehicleId = +params.vehicleId;
      this.getVehicleById(this.vehicleId);
      this.startDate = params.startDate;
      this.endDate = params.endDate;
    });
    this.username = this.authService.getUserName();
    this.userId = this.authService.getUserId();
    if (this.username != null) {
      this.isLoggedIn = true;
    }
    this.getUser(this.username);
  }

  getUser(uname: string) {
    this.authService.getUserByUserName(uname).subscribe(user => {
      this.user = user;
    }, error => {
      console.log(error.message);
    });
  }

  getVehicleById(id) {
    this.vehicleService.findById(this.vehicleId).subscribe(v => {
      this.vehicleToCheckout = v;
    });
  }

  saveOrderDetails() {
    this.vehicleService.findById(this.vehicleId).subscribe(v => {
      this.vehicleToCheckout = v;
      this.orderDetail.vehicle = this.vehicleToCheckout;
      this.orderDetail.totalPrice = this.lengthOfRental * this.vehicleToCheckout.price;
      this.orderDetail.startTime = new Date(this.startDate);
      this.orderDetail.endTime = new Date(this.endDate);
      this.orderDetail.own = this.vehicleToCheckout.owner;
      this.orderDetail.renter = this.user;
      this.orderDetailService.save(this.orderDetail).subscribe(() => {
        this.router.navigate(['booking-confirmation'], {
          queryParams: {
            ownerName: this.orderDetail.own.fullName,
            ownerEmail: this.orderDetail.own.email,
            totalPrice: this.orderDetail.totalPrice,
            startDate: this.orderDetail.startTime,
            endDate: this.orderDetail.endTime,
            vehicleBrand: this.orderDetail.vehicle.brand,
            vehicleDescription: this.orderDetail.vehicle.description,
            vehicleLocation: this.orderDetail.vehicle.location.name + ', ' + this.orderDetail.vehicle.location.country
          }
        });
      });
    });

  }


}
