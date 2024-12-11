import { Component } from '@angular/core';
import {BusinessGroupsComponent} from './business-groups/business-groups.component';

@Component({
  selector: 'app-operation',
  imports: [
    BusinessGroupsComponent
  ],
  templateUrl: './operation.component.html',
  styleUrl: './operation.component.scss'
})
export class OperationComponent {

}
