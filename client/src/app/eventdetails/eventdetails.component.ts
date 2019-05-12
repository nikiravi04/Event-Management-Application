import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogformComponent } from '../dialogform/dialogform.component';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  selector: 'app-eventdetails',
  templateUrl: './eventdetails.component.html',
  styleUrls: ['./eventdetails.component.css']
})
export class EventdetailsComponent implements OnInit {
  latitude=42.3601;
  longitude=-71.0589;
  details: UserDetails;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
     
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogformComponent, {
      // width: '250px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("This is from event componet"+result);
      //this.animal = result;
    });
  }
}