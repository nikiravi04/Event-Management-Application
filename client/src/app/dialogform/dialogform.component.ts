// importing all the modules we need
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { AuthenticationService, UserDetails } from '../authentication.service';


@Component({
  selector: 'app-dialogform',
  templateUrl: './dialogform.component.html',
  styleUrls: ['./dialogform.component.css']
})
export class DialogformComponent implements OnInit {
  // We are storing the loggedin user details here
  details: UserDetails;

  dialogForm:FormGroup = new FormGroup ({
    phone:new FormControl(null, Validators.required )
  })
  constructor(private auth: AuthenticationService,public dialogRef: MatDialogRef<DialogformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

    }

  ngOnInit() {
    // console.log(this.data);
  }
  // function to update the number of people attending
  getPersonCount(value){
    this.data.reg.AttendeesNum=value;
  }
  // function that calls the method in the auth services to save the data to the db
  save(data){
      console.log("attendees"+this.data.reg);
      this.dialogRef.close(this.data.reg);
    this.auth.sendEmailReg(this.data.reg.EmailID,this.data.reg.UserName,this.data.reg.PhoneNumber,this.data.reg.EventName).subscribe(success => {
      console.log(success);
    }, error => {
      console.error(error);
    });
  }

  // function to close the modal
  onNoClick(): void {
    this.dialogRef.close();
  }
}
