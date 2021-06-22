import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Vehicle} from '../../../model/vehicle';
import {OrderDetailService} from '../../../service/order-detail.service';
import {OrderDetail} from '../../../model/order-detail';
import {AuthService} from '../../../service/auth.service';
import {UserService} from '../../../service/user.service';
import {User} from '../../../model/user';

@Component({
  selector: 'app-dashboard-bookings',
  templateUrl: './dashboard-bookings.component.html',
  styleUrls: ['./dashboard-bookings.component.css']
})
export class DashboardBookingsComponent implements OnInit {
  currentUserId: number;
  isLoggedIn: boolean;
  username: string;

  orderDetail: OrderDetail[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private order: OrderDetailService,
              private authService: AuthService,
              private userService: UserService) {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.authService.userId.subscribe((data: number) => this.currentUserId = data);
    this.username = this.authService.getUserName();
    this.currentUserId = this.authService.getUserId();
    if (this.username != null) {
      this.isLoggedIn = true;
    }
  }

  ngOnInit() {
    this.order.History(this.currentUserId).subscribe(data => {
      this.orderDetail = data;
    });
    this.getAll();
  }

  getAll() {
    this.order.findAll(this.currentUserId).subscribe(data => {
      this.orderDetail = data;
    })
  }

  searchByDate(date: any) {
    this.order.findBetween(date, this.currentUserId).subscribe(data => {
      this.orderDetail = data;
    });
  }

}
