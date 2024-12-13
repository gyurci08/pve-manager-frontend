import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {VmService} from '../../../services/vm-service';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs';
import {MatTable, MatTableModule} from '@angular/material/table';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormsModule} from '@angular/forms';
import {Vm} from '../../../entities/Vm';
import {CustomerService} from '../../../services/customer-service';
import {Customer} from '../../../entities/Customer';
import {SearchableListComponent} from '../../../core/components/generic/searchable-list/searchable-list.component';

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
    RouterModule,
    SearchableListComponent
  ],
  templateUrl: './customer-vm.component.html',
  standalone: true,
  styleUrl: './customer-vm.component.scss'
})
export class CustomerVmComponent implements OnInit{
  constructor(
    private vmService: VmService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  customerId!:number;
  vms: Vm[] = [];
  isLoading = true;
  error: string | null = null;

  ngOnInit() {
    this.customerId = +this.route.snapshot.paramMap.get('customerId')!;
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    this.isLoading = true;
    this.vmService.getVms(this.customerId).subscribe({
      next: (data) => {
        this.vms = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch customers. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching customers:', err);
      }
    });
  }

  onVmClick(vm: Vm) {
    this.router.navigate(['/operation/customer', this.customerId,'vm',vm.id]);
  }
}
