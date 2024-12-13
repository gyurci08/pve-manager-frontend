import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {VmService} from '../../../services/vm-service';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs';
import {MatTable, MatTableModule} from '@angular/material/table';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormsModule} from '@angular/forms';
import {Vm} from '../../../entities/Vm';

@Component({
  selector: 'app-customer-vm',
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
  templateUrl: './customer-vm.component.html',
  standalone: true,
  styleUrl: './customer-vm.component.scss'
})
export class CustomerVmComponent implements OnInit, AfterViewInit {

  constructor(
    private vmService: VmService,
    private route: ActivatedRoute
  ) {}

  vms: Vm[] = [];
  filteredVms: any[] = [];
  loading: boolean = true;
  searchTerm: string = '';
  displayedColumns: string[] = ['name'];
  private searchSubject = new Subject<string>();
  customerId!: number;

  @ViewChild(MatTable) table!: MatTable<any>;

  ngOnInit() {
    this.customerId = +this.route.snapshot.paramMap.get('customerId')!;
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
