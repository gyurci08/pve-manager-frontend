import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OperationComponent } from './operation/operation.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'operation', component: OperationComponent }
];
