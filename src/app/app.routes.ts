import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OperationComponent } from './operation/operation.component';
import {NodesComponent} from './nodes/nodes.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'operation', component: OperationComponent },
  { path: 'nodes', component: NodesComponent }
];
