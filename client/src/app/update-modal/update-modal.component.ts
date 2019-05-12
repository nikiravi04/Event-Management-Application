import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent implements OnInit {
  details: UserDetails;
  constructor(private auth: AuthenticationService,public dialogRef: MatDialogRef<UpdateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  // function to update the attendees count
  getPersonCount(value){
    this.data.reg.AttendeesNum=value;
  }
  // function to save the updated data
  save(data){
    console.log("attendees"+this.data.reg);
    this.dialogRef.close(this.data.reg);
}
// function to close the popup
onNoClick(): void {
  this.dialogRef.close();
}
}

