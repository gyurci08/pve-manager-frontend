import { Routes } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ProvisionComponent} from './pages/provision/provision.component';
import {OperationComponent} from './pages/operation/operation.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'provision', component: ProvisionComponent },
  { path: 'operation', component: OperationComponent }
];
