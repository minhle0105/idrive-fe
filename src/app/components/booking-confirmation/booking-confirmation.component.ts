import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css']
})
export class BookingConfirmationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  viewInvoice() {
    this.router.navigate(['invoice']);
  }

}
