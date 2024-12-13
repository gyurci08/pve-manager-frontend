import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CustomerService } from '../../../services/customer-service';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {RouterLink} from '@angular/router';
import {Customer} from '../../../entities/Customer';
import {SearchableListComponent} from '../../../core/components/searchable-list/searchable-list.component';

@Component({
  selector: 'app-customers',
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterLink,
    SearchableListComponent
  ],
  templateUrl: './customers.component.html',
  standalone: true,
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {
  constructor(private customerService: CustomerService) {}

  customers: Customer[] = [];
  isLoading = true;
  error: string | null = null;

  ngOnInit() {
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    this.isLoading = true;
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch customers. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching customers:', err);
      }
    });
  }

  onCustomerClick(customer: Customer) {
    // Handle customer click, e.g., navigate to customer details
    console.log('Customer clicked:', customer);
  }
}
