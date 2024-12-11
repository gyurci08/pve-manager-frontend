import { Component } from '@angular/core';
import {NodeService} from '../../service/node.service';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {CommonModule, DecimalPipe, PercentPipe} from '@angular/common';
import {VmService} from '../../service/vm.service';

@Component({
  selector: 'app-node',
  imports: [CommonModule, MatCardModule, MatListModule, DecimalPipe, PercentPipe],
  templateUrl: './node.component.html',
  styleUrl: './node.component.scss'
})
export class NodeComponent {
  node: any;
  vms: any[] = [];

  constructor(
    private nodeService: NodeService,
    private vmService: VmService
  ) {}

  ngOnInit() {
    this.fetchNode();
  }

  fetchNode() {
    this.nodeService.getNode("jgy-pvedev").subscribe({
      next: (data) => {
        this.node = data;
        this.fetchVms(this.node.node);
      },
      error: (error) => {
        console.error('Error fetching node:', error);
      }
    });
  }

  fetchVms(nodeId: string) {
    this.vmService.getVms(nodeId).subscribe({
      next: (data) => {
        this.vms = data;
      },
      error: (error) => {
        console.error('Error fetching VMs:', error);
      }
    });
  }
}
