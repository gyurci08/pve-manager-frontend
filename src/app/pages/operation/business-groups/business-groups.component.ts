import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {NodeService} from '../../../services/node-service/node-service';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-business-groups',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinner
  ],
  templateUrl: './business-groups.component.html',
  styleUrl: './business-groups.component.scss'
})
export class BusinessGroupsComponent implements OnInit{
  displayedColumns: string[] = ['id', 'hostname'];
  dataSource!: MatTableDataSource<any>;
  loading: boolean = true; // Property to track loading state

  constructor(private nodeService: NodeService) {}

  ngOnInit() {
    this.loadNodes();
  }

  loadNodes() {
    this.loading = true; // Set loading to true before fetching data
    this.nodeService.fetchNodes().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.loading = false; // Set loading to false after data is fetched
      },
      error: (error) => {
        console.error('Error fetching nodes:', error);
        this.loading = false; // Set loading to false even on error
      }
    });
  }

  onNodeClick(nodeId: number) {
    this.nodeService.fetchNode(nodeId).subscribe({
      next: (data) => {
        console.log('Node Data:', data); // Handle the response data here
      },
      error: (error) => {
        console.error('Error fetching node data:', error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
