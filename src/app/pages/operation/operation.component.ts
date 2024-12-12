import { Component } from '@angular/core';
import {CustomersComponent} from './customers/customers.component';
import {BreadcrumbComponent} from '../../core/components/breadcrumb/breadcrumb.component';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-operation',
  imports: [
    RouterModule,
    BreadcrumbComponent
  ],
  templateUrl: './operation.component.html',
  standalone: true,
  styleUrl: './operation.component.scss'
})
export class OperationComponent {

}
