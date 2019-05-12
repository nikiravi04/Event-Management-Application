import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { UserDetails } from '../authentication.service';

@Component({
  selector: 'app-successmodal',
  templateUrl: './successmodal.component.html',
  styleUrls: ['./successmodal.component.css']
})
export class SuccessmodalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SuccessmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  // function that is called to close the popup
  onNoClick(): void {
    this.dialogRef.close();
  }
}
