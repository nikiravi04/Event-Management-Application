import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { HttpInterceptor } from '@angular/common/http';



@Injectable({
  providedIn:'root'
})

//EventBrite APi class, which makes a call to all the APis used in the project
export class EventsAPIService {
  constructor(private http : HttpClient) { }

  //function to extract data from the JSOn returned as a response from the API
  private extractData(res: Response) {
    const myObjStr = JSON.stringify(res);
     let jsonObj: any= JSON.parse(myObjStr);
     
   return jsonObj;
  }


//returns retrive all the Events
  getEvents(): Observable<any[]> 
  {
   return this.http.get("https://www.eventbriteapi.com/v3/events/?token=VRF5VFIQ5CO4RTUIBDIS")
   
          .pipe(map(this.extractData)) 
  }
 
//Returns all the events based on ID(EventID)
  getEventsByID(id): Observable<any[]> 
  {
   return this.http.get("https://www.eventbriteapi.com/v3/events/"+id+"?token=VRF5VFIQ5CO4RTUIBDIS")
   
          .pipe(map(this.extractData))
  }

  //Returns events based on ID(CategoryID) 
  getEventsByCategory(id): Observable<any[]> 
  {
   return this.http.get("https://www.eventbriteapi.com/v3/events/search/?categories="+id+"&token=VRF5VFIQ5CO4RTUIBDIS")
   
          .pipe(map(this.extractData))
  }

//Returns events based on the searchname, for location( filtervalue contains the location, id is the category ID)
  getEventsByLocation(filtervalue,id): Observable<any[]> 
  {
    console.log("https://www.eventbriteapi.com/v3/events/search?categories="+id+"&location.address="+filtervalue+"&location.within=10km&expand=venue&token=VRF5VFIQ5CO4RTUIBDIS")
   return this.http.get("https://www.eventbriteapi.com/v3/events/search?categories="+id+"&location.address="+filtervalue+"&location.within=10km&expand=venue&token=VRF5VFIQ5CO4RTUIBDIS")
   
          .pipe(map(this.extractData))
  }

//Returns all the trending events based on the current 
  getTrendingEvents(): Observable<any[]> 
  {
   return this.http.get("https://www.eventbriteapi.com/v3/events/search?location.address=boston&location.within=10km&expand=venue&token=VRF5VFIQ5CO4RTUIBDIS")
   
          .pipe(map(this.extractData))
  }

  
//Returns the venue details  based on events 
  getVenueById(id): Observable<any[]> 
  {
   return this.http.get(" https://www.eventbriteapi.com/v3/venues/"+id+"?token=VRF5VFIQ5CO4RTUIBDIS")
          .pipe(map(this.extractData))
  }
}

