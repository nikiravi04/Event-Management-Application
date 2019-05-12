import { Component, OnInit } from '@angular/core';
import { EventsAPIService } from '../events-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogformComponent } from '../dialogform/dialogform.component';
import {UpdateModalComponent} from '../update-modal/update-modal.component';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  details: UserDetails;
  bookedEventary=[];
  obj:any;

  resArr = [];

  constructor(private auth: AuthenticationService,public dialog: MatDialog,public sanitizer: DomSanitizer,private eventsServ :EventsAPIService,private route: ActivatedRoute,private router: Router) {}
  
  ngOnInit() {
  
    this.auth.profile().subscribe(user => {
      this.details = user;
      fetch('http://localhost:3000/api/eventread/'+this.details._id, {
                    method: 'GET'
                }).then((res) => res.json())
                .then((data) => {
                  
                console.log(data);
                for (var i=0;i<data.length;i++)
                {
                  this.bookedEventary.push(data[i]);
                    console.log("blsghiu"+ this.bookedEventary)
                }
              }).then(()=>{this.getUserEvents()}).catch((err)=>console.log(err));
    }, (err) => {
      console.error(err);
    });
  }
  //Navigate to the events detail page
  Move(id:any)
  {
    console.log(id)
    this.router.navigate(['/eventsDetailPage/'+id+'']);
  }
  //Delete an event
  delete(id:any){
    console.log("delete event"+id);
    this.auth.deleteEvent(id);
  }
  //Update an event
  update(id:any){
    for(var i =0;i<this.bookedEventary.length;i++){
      if(this.bookedEventary[i].EventID==id){
        console.log("inside update"+this.bookedEventary[i]);
        this.openDialog(this.bookedEventary[i]);

      }
    }
  }
  //Open Dialog box
  openDialog(obj): void {
    const dialogRef = this.dialog.open(UpdateModalComponent,
       {
      width: '500px',
      height: '500px',
      data: {reg: obj}
    }
    );
    //Close the dialog box
    dialogRef.afterClosed().subscribe(result => {
      console.log("This is from dialogue componet"+result);
      this.auth.update(result);
    });
  }
  //Get all events for the suer
  public getUserEvents() {
    console.log("profile page huhu"+this.bookedEventary);
    for(var i =0;i<this.bookedEventary.length;i++)
    { 
        this.eventsServ.getEventsByID(this.bookedEventary[i].EventID).subscribe(data => {
     
          const myObjStr = JSON.stringify(data);
          const jsonObj: any= JSON.parse(myObjStr);
          console.log(jsonObj);
          
        this.resArr.push(jsonObj);
        });
        
    }
    
  }
}
