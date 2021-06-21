import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {AuthService} from '../../service/auth.service';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {OrderDetail} from '../../model/order-detail';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  username: string;
  userId: number;
  user: User = {};
  isLoggedIn: boolean;
  ownerName;
  ownerEmail;
  totalPrice;
  startDate;
  endDate;
  vehicleBrand;
  vehicleDescription;
  vehicleLocation;

  dateObj = new Date();
  month = this.dateObj.getUTCMonth() + 1; //months from 1-12
  day = this.dateObj.getUTCDate();
  year = this.dateObj.getUTCFullYear();

  today = `${this.year}/${this.month}/${this.day}`;

  constructor(private authService: AuthService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute) {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.authService.userId.subscribe((data: number) => this.userId = data);
  }

  ngOnInit() {
    this.username = this.authService.getUserName();
    this.userId = this.authService.getUserId();
    if (this.username != null) {
      this.isLoggedIn = true;
    }
    this.getUser(this.username);
    this.activatedRoute.queryParams.subscribe(params => {
      this.ownerName = params.ownerName;
      this.ownerEmail = params.ownerEmail;
      this.totalPrice = params.totalPrice;
      this.startDate = params.startDate;
      this.endDate = params.endDate;
      this.vehicleBrand = params.vehicleBrand;
      this.vehicleDescription = params.vehicleDescription;
      this.vehicleLocation = params.vehicleLocation;
    });
  }

  getUser(uname: string) {
    this.authService.getUserByUserName(uname).subscribe(user => {
      this.user = user;
    }, error => {
      console.log(error.message);
    });
  }

}
