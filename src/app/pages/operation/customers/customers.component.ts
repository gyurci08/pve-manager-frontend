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

@Component({
  selector: 'app-customers',
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatInputModule,
    RouterLink
  ],
  templateUrl: './customers.component.html',
  standalone: true,
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit, AfterViewInit {

  constructor(private customerService: CustomerService) {}

  customers: any[] = [];
  filteredCustomers: any[] = [];
  loading: boolean = true;
  searchTerm: string = '';
  displayedColumns: string[] = [ 'name'];
  private searchSubject = new Subject<string>();

  @ViewChild(MatTable) table!: MatTable<any>;

  ngOnInit() {
    this.loadCustomers();
    this.setupSearch();
  }

  ngAfterViewInit() {
    this.initializeTable();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.filteredCustomers = data;
        this.loading = false;
        this.initializeTable();
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
        this.loading = false;
      }
    });
  }

  setupSearch() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.filterCustomers(searchTerm);
    });
  }

  onSearchChange(searchTerm: string) {
    this.searchSubject.next(searchTerm);
  }

  filterCustomers(searchTerm: string) {
    this.filteredCustomers = this.customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.initializeTable();
  }

  private initializeTable() {
    if (this.table) {
      this.table.renderRows();
    }
  }
}
