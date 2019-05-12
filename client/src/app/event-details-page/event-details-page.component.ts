import { Component, OnInit } from '@angular/core';
import { EventsAPIService } from '../events-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogformComponent } from '../dialogform/dialogform.component';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { PleaseLoginComponent } from '../please-login/please-login.component';


@Component({
  selector: 'app-event-details-page',
  templateUrl: './event-details-page.component.html',
  styleUrls: ['./event-details-page.component.css']
})
export class EventDetailsPageComponent implements OnInit {

  constructor(private auth: AuthenticationService,public dialog: MatDialog,public sanitizer: DomSanitizer,private eventsServ :EventsAPIService,private route: ActivatedRoute,private router: Router) { }
  // array where the event details are stored
  eventsDetails: Array<any>[];

  
  id : string =""
  url: string=""
  urls:any;

  startdate: string=""
  starttime: string=""
  enddate: string=""
  endtime: string=""
  timezone: string=""

  latitude:Number;
  longitude:Number;
  obj:any;
 

  resArr = [];
  regObj = {
    UserName:"",
    UserID:"",
    EventName:"",
    EventID:"",
    PhoneNumber:"",
    EmailID:"",
    AttendeesNum:""
  }

   venArr=[];
  ngOnInit() {
    // Getting ID from the previous url
    this.id=this.route.snapshot.params['id'];
    console.log("from ID by events "+this.id);

    // The function to get the events for a particular ID
    this.eventsServ.getEventsByID(this.id).subscribe(data => {
     
      const myObjStr = JSON.stringify(data);
      const jsonObj: any= JSON.parse(myObjStr);
      this.obj=jsonObj;
      this.resArr.push(jsonObj);
      var Startdate = new Date(this.resArr[0].start.local);
      var Enddate = new Date(this.resArr[0].end.local);
      
// Storing the the date and time of the event
      this.startdate=Startdate.toDateString();
      this.starttime= Startdate.toLocaleTimeString();
      this.enddate= Enddate.toDateString();
      this.endtime = Enddate.toLocaleTimeString();
      this.timezone = this.resArr[0].start.timezone;
      
     console.log("url id " +this.resArr[0].url);
    //to post the url to favebook based on the event chosen
     this.url='https://www.facebook.com/plugins/share_button.php?href='+this.resArr[0].url+'&layout=button_count&size=small&width=89&height=20&appId';
     

     //to pass all the securities to allow facebook to accept the url event
     this.urls = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
     
     console.log("url id " +this.resArr[0].venue_id);
    // this.getVenue(this.resArr[0].venue_id);


    //a service to get the venue for an event
    this.eventsServ.getVenueById(this.resArr[0].venue_id).subscribe(data => {
     
      const myObjStr = JSON.stringify(data);
      let jsonObj: any= JSON.parse(myObjStr);
      this.venArr.push(jsonObj);

      console.log(this.venArr[0].address.latitude);
      console.log(this.venArr[0].address.longitude);
      //converting the string to number type
this.latitude= Number(this.venArr[0].address.latitude);
this.longitude=Number(this.venArr[0].address.longitude);
      console.log(this.venArr[0]);


  });

    console.log(jsonObj);

      
      // console.log(this.regObj);

  //this.users=jsonObj.events;
  this.eventsDetails=this.resArr;


     
     });

  }
  // Function to populate the registration object that will be sent to DialogformComponent
  populate(jsonObj):void {
    this.regObj.EmailID=this.auth.getUserDetails().email;
    this.regObj.EventID=this.resArr[0].id;
    this.regObj.EventName=this.resArr[0].name.text;
    this.regObj.PhoneNumber=this.auth.getUserDetails().phone;
    this.regObj.UserName=this.auth.getUserDetails().name;
    this.regObj.UserID=this.auth.getUserDetails()._id;
    
  }

  // Function to open the DialogformComponent popup
  openDialog(): void {
    if(this.auth.isLoggedIn()){
    this.populate(this.obj);
    const dialogRef = this.dialog.open(DialogformComponent,
       {
        width: '500px',
        height: '500px',
      data: {reg: this.regObj}
    }
    );
    // function to save on close on the popup
    dialogRef.afterClosed().subscribe(result => {
      console.log("This is from dialogue componet"+result);
      this.auth.eventSave(result);
    });
  }else {
    const dialogRef1 = this.dialog.open(PleaseLoginComponent,
      {
       width: '500px',
       height: '400px',
      data: {text:"Haven't logged in yet? Please login to register for an event!"}
   }
   );
  }
}
}

 


