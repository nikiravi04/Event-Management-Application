import { Component, OnInit, Input } from '@angular/core';
import { EventsAPIService } from '../events-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.component.html',
  styleUrls: ['./search-event.component.css']
})

export class SearchEventComponent implements OnInit {
 
  events: Array<string>[];
   searchName:string;
   

constructor(private eventsServ :EventsAPIService,private route: ActivatedRoute,private router: Router ) { }

  ngOnInit() {



  this.searchName=this.route.snapshot.params['searchName'];
  console.log("from searchName "+this.searchName);
    
    //gets the id from url using route.snapshot.params

console.log("xfghcgjkb "+ this.route.snapshot.params['id2']);

console.log("parameter is "+ this.route.snapshot.params['id3']);

//if condition to check if the evnt is based on location or just a random search
if(this.route.snapshot.params['id3']=="Location")
{

  //eventbrite api to return the events based on location 
  this.eventsServ.getEventsByLocation(this.searchName,this.route.snapshot.params['id2']).subscribe(data => {

    const myObjStr = JSON.stringify(data);
    let jsonObj: any= JSON.parse(myObjStr);

    var resArr= [];
    // a filter to filter out all the repeated events and null events if any
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
 
   
   console.log(resArr);
   this.events=resArr;
  });


}
else{
//gets all the event detials based on the category chosen 

  this.eventsServ.getEventsByCategory(this.route.snapshot.params['id2']).subscribe(data => {

    const myObjStr = JSON.stringify(data);
    let jsonObj: any= JSON.parse(myObjStr);

    var resArr= [];
 
    for (var i=0; i<jsonObj.events.length; i++){

      //getting details from API and performing search based on matched event names
      let s: string =jsonObj.events[i].name.text;
  
     if(s.toLowerCase().includes(this.searchName.toLowerCase())){
     
        resArr.push(jsonObj.events[i]);
      }
    
      
    }  
   console.log(resArr);
   this.events=resArr;
  });

}

       
    
} 

//retrieves events based on provided iD

 Move(id:any)
  {
    console.log(id)
    this.router.navigate(['/eventsDetailPage/'+id+'']);
  }



   }

  
   

