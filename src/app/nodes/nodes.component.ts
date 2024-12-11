import {Component, OnInit} from '@angular/core';
import {NodeService} from '../../service/node.service';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-nodes',
  imports: [CommonModule, MatCardModule, MatListModule],
  templateUrl: './nodes.component.html',
  styleUrl: './nodes.component.scss'
})
export class NodesComponent implements OnInit{
  constructor(private nodeService: NodeService) {}

  nodes: any[]=[];

  ngOnInit() {
    this.fetchNodes();
  }

  fetchNodes() {
    console.log("Fetching data")
    this.nodeService.getNodes().subscribe({
      next: (data) => {
        this.nodes = data;
        console.log('Fetched nodes:', this.nodes);
      },
      error: (error) => {
        console.error('Error fetching nodes:', error);
      }
    });
  }
}
