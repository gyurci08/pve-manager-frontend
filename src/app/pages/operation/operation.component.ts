import { Component } from '@angular/core';
import {CustomersComponent} from './customers/customers.component';

@Component({
  selector: 'app-operation',
  imports: [
    CustomersComponent
  ],
  templateUrl: './operation.component.html',
  styleUrl: './operation.component.scss'
})
export class OperationComponent {

}
