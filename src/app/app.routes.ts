import { Routes } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ProvisionComponent} from './pages/provision/provision.component';
import {OperationComponent} from './pages/operation/operation.component';
import {CustomerDetailComponent} from './pages/operation/customer-detail/customer-detail.component';
import {CustomersComponent} from './pages/operation/customers/customers.component';
import {CustomerVmComponent} from './pages/operation/customer-vm/customer-vm.component';
import {CustomerVmDetailComponent} from './pages/operation/customer-vm-detail/customer-vm-detail.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'provision', component: ProvisionComponent },
  {
    path: 'operation',
    component: OperationComponent,
    children: [
      { path: '', component: CustomersComponent },
      { path: 'customer/:customerId', component: CustomerDetailComponent },
      { path: 'customer/:customerId/vm', component: CustomerVmComponent },
      { path: 'customer/:customerId/vm/:vmId', component: CustomerVmDetailComponent }
    ]
  }
];
