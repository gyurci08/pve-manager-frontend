import {Component, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, NgIf, UpperCasePipe} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Vm} from '../../../entities/Vm';
import {VmService} from '../../../services/vm-service';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-customer-vm-detail',
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
  templateUrl: './customer-vm-detail.component.html',
  standalone: true,
  styleUrl: './customer-vm-detail.component.scss'
})
export class CustomerVmDetailComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vmService: VmService
  ) {}

  loading:boolean = true;

  customerId!: number;
  vmId!: number;

  vm!: Vm;

  loadVm(){
    console.log(this.customerId," ", this.vmId)
    this.vmService.getVm(this.customerId, this.vmId).pipe(
      //@ts-ignore
      map(data => new Vm(data)),
      catchError(error => {
        console.error('Error loading customer:', error);
        this.loading = false;
        return of(null);
      })
    ).subscribe(
      vm => {
        if (vm){
          this.vm = vm;
          this.loading = false;
        }
      }
    );
  }



  ngOnInit() {
    this.customerId = +this.route.snapshot.paramMap.get('customerId')!;
    this.vmId = +this.route.snapshot.paramMap.get('vmId')!;
    this.loadVm();
  }
}
