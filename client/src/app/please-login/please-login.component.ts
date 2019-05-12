import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  selector: 'app-please-login',
  templateUrl: './please-login.component.html',
  styleUrls: ['./please-login.component.css']
})
export class PleaseLoginComponent implements OnInit {

  constructor(private auth: AuthenticationService,public dialogRef: MatDialogRef<PleaseLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  // function to close the popup
  onNoClick(): void {
    this.dialogRef.close();
  }
}
