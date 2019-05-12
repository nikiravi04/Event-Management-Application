import { Component, OnInit } from '@angular/core';
import { EventsAPIService } from '../events-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../authentication.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  users: Array<any>[];

  constructor(private eventsServ :EventsAPIService,private route: ActivatedRoute,private router: Router, public auth:AuthenticationService) { }

  ngOnInit() {

    this.getAllTrendingEvents();
  }

//Function to return all the trending events based on location Eg: boston
  getAllTrendingEvents()
  {
    this.eventsServ.getTrendingEvents().subscribe(data => {
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
 
    //Cuts down the array to show only the top6 events for trending events
    this.users=resArr.splice(5,6);
     
     });
     
  }
  //To route to a page to show all the events based on the category chosed
  MoveToCategory(categoryId:any)
  {
    
    this.router.navigate(['/allEvents/'+categoryId+'']);
  }

  //To route to a pafe to show  the full setals of an event 
  Move(id:any)
  {
    
    this.router.navigate(['/eventsDetailPage/'+id+'']);
  }




}
