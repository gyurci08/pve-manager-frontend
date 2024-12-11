import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {UserDialogComponent} from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private dialog: MatDialog) {}

  openUserAccountDialog(event: MouseEvent): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      // Set the position of the dialog
      position: {
        top: `${event.clientY + 1}px`, // Add some offset if needed
        left: `${event.clientX - 300}px` // Adjust based on your dialog width
      },
      width: '250px', // Set width as needed
      height: 'auto' // Set height as needed
    });
  }
}
