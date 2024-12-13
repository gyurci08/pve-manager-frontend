import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import { of } from 'rxjs';
import { CustomerService } from '../../../services/customer-service';
import { DatePipe, NgIf, UpperCasePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {Customer} from '../../../entities/Customer';



@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  standalone: true,
  imports: [
    NgIf,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    DatePipe,
    UpperCasePipe
  ],
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {}

  loading:boolean = true;

  customerId!: number;
  customer!: Customer;


  ngOnInit() {
    this.customerId = +this.route.snapshot.paramMap.get('customerId')!;
    this.loadCustomer();
  }

  loadCustomer() {
    this.customerService.getCustomer(this.customerId).pipe(
      // @ts-ignore
      map(data => new Customer(data)),
      catchError(error => {
        console.error('Error loading customer:', error);
        return of(null);
      })
    ).subscribe(
      customer => {
        if (customer) {
          this.customer = customer;
          this.loading = false;
        }
      }
    );
  }



}
