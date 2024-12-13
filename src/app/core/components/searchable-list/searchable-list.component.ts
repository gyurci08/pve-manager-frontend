import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTable, MatTableModule} from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-searchable-list',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    FormsModule
  ],
  templateUrl: './searchable-list.component.html',
  standalone: true,
  styleUrl: './searchable-list.component.scss'
})
export class SearchableListComponent {
  @Input() data: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Output() rowClick = new EventEmitter<any>();

  @ViewChild(MatTable) table!: MatTable<any>;

  filteredList: any[] = [];
  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  ngOnInit() {
    this.setupSearch();
    this.filteredList = this.data;
  }

  ngAfterViewInit() {
    this.initializeTable();
  }

  setupSearch() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.filterList(searchTerm);
    });
  }

  onSearchChange(searchTerm: string) {
    this.searchSubject.next(searchTerm);
  }

  filterList(searchTerm: string) {
    this.filteredList = this.data.filter(item =>
      Object.values(item).some(val =>
        //@ts-ignore
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    this.initializeTable();
  }

  private initializeTable() {
    if (this.table) {
      this.table.renderRows();
    }
  }

  onRowClick(row: any) {
    this.rowClick.emit(row);
  }
}
