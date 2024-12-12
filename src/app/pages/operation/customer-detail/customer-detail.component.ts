import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { MatTable } from '@angular/material/table';
import { VmService } from '../../../services/vm-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss'
})
export class CustomerDetailComponent implements OnInit, AfterViewInit {

  constructor(
    private vmService: VmService,
    private route: ActivatedRoute
  ) {}

  vms: any[] = [];
  filteredVms: any[] = [];
  loading: boolean = true;
  searchTerm: string = '';
  displayedColumns: string[] = ['name'];
  private searchSubject = new Subject<string>();
  customerId!: number;

  @ViewChild(MatTable) table!: MatTable<any>;

  ngOnInit() {
    this.customerId = +this.route.snapshot.paramMap.get('id')!;
    this.loadVms();
    this.setupSearch();
  }

  ngAfterViewInit() {
    this.initializeTable();
  }

  loadVms() {
    this.vmService.getVms(this.customerId).subscribe({
      next: (data) => {
        this.vms = data;
        this.filteredVms = data;
        this.loading = false;
        this.initializeTable();
      },
      error: (error) => {
        console.error('Error fetching vms:', error);
        this.loading = false;
      }
    });
  }

  setupSearch() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.filterVms(searchTerm);
    });
  }

  onSearchChange(searchTerm: string) {
    this.searchSubject.next(searchTerm);
  }

  filterVms(searchTerm: string) {
    this.filteredVms = this.vms.filter(vm =>
      vm.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.initializeTable();
  }

  private initializeTable() {
    if (this.table) {
      this.table.renderRows();
    }
  }
}
