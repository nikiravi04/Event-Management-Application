import { Component, OnInit, Output } from '@angular/core';
import { EventsAPIService } from '../events-api.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent implements OnInit {

  users: Array<any>[];
 final: Array<any>[];
 searchParameter : string=""

  constructor(private eventsServ :EventsAPIService ,private route: ActivatedRoute,private router: Router) { }

  id : string =""
  
  ngOnInit() {


  this.id=this.route.snapshot.params['id'];
  console.log("from ID by events "+this.id);
  this.getAllEvents(this.id);

  }


//Function to retrive all the events based on the category Id passed 
  getAllEvents(id) :Array<any>[]
  {

    //subscribes to the eventbrite api with provided category Id
    this.eventsServ.getEventsByCategory(id).subscribe(data => {
     
      const myObjStr = JSON.stringify(data);
      let jsonObj: any= JSON.parse(myObjStr);
      
  
      var resArr = [];

      //Filtering out if there are any repeated events and if any events are not active
      jsonObj.events.filter(function(item){
      var i = resArr.findIndex(x => (x.name.text == item.name.text ) );
      if(i <= -1){
        if(item.logo!=null)
        {
            resArr.push(item);
        }
      }
    return null;
  });
  
  //assigning it to final array to use it on the front end
  this.final=resArr;
     
     });
     
     return this.final;

  }

// Function to retrive all the events based on the searchLocation,category Id passed 
   getAllEventsBasedOnLocation(filtervalue,id) :Array<any>[]
  {

    //eventbrite api to get events based on loctaion

    this.eventsServ.getEventsByLocation(filtervalue,id).subscribe(data => {
     
      const myObjStr = JSON.stringify(data);
      let jsonObj: any= JSON.parse(myObjStr);
      
  
      var resArr = [];
      jsonObj.events.filter(function(item){
    var i = resArr.findIndex(x => (x.name.text == item.name.text ) );
    if(i <= -1){
      if(item.logo!=null)
      {
          resArr.push(item);
      }
    }
    return null;
  });
 
  
  this.final= resArr;
     
     });
     
return this.final;
  }


//Changes the contenets based on the dropdown chosen
  filterbasedonValue(filterVal: any) {
    this.searchParameter=filterVal;
    if (this.searchParameter == "AllEvents")
    {
      console.log(this.searchParameter)
      this.final = this.getAllEvents(this.id);
    }
    else {
      console.log(this.searchParameter)
    this.final =this.getAllEventsBasedOnLocation(this.searchParameter,this.id)
      
    } 
  }


  //routes to a details page to show the events chosen
  Move(id:any)
  {
    console.log(id)
    this.router.navigate(['/eventsDetailPage/'+id+'']);
  }

 
//routes to a page to show the searched for events
  MoveToEvents(search:any)
  {
   
    console.log(search)
    console.log("para is"+this.searchParameter)
  
    this.router.navigate(['/eventsBySearchName/',search,this.id,this.searchParameter]);

   
  }

}