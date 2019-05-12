import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { EventsAPIService } from './events-api.service';
import { ActivatedRoute, } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogformComponent } from './dialogform/dialogform.component';
import { SuccessmodalComponent } from './successmodal/successmodal.component';

//Export the User details for components
export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  phone : string;
  exp: number;
  iat: number;
}
//Return a TokenResponse object
interface TokenResponse {
  token: string;
}
//The login and register endpoints expect a TokenPayload during the request
export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
  phone : string;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'http://localhost:3000';

@Injectable()

export class AuthenticationService {
  private token: string;
  sendEmailUrl = `/api/send`;
  sendEmailUrlReg = `/api/sendreg`;

  constructor(private http: HttpClient, private router: Router,public dialog: MatDialog,public sanitizer: DomSanitizer,private eventsServ :EventsAPIService,private route: ActivatedRoute) {}

  //sending email for registration of user
  public sendEmail(email,name,phone): Observable<any> {
  
    const uri = `${this.sendEmailUrl}`;
    const obj = {
      name: name,
      email: email,
      phone : phone
    };
    return this.http.post(uri, obj);
  }

  //sending email for registration of event by a user
  public sendEmailReg(email,name,phone,event): Observable<any> {

    const uri = `${this.sendEmailUrlReg}`;
    const obj = {
      name: name,
      email: email,
      phone : phone,
      event : event
    };
    return this.http.post(uri, obj);
  }

  // saving token
  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  //getting the token
  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  //getting the userdetails from token
  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  //getting events based on ID
  public getEventsBasedOnUID(id:String): Array<Object> {
    const myarr: Array<Object>=[];
   fetch('http://localhost:3000/api/eventread/'+id, {
                    method: 'GET'
                }).then((res) => res.json())
                .then((data) => {
                  
                console.log(data);
                for (var i=0;i<data.length;i++)
                {
                    myarr.push(data[i]);
                    console.log("blsghiu"+ myarr)
                }
              }).catch((err)=>console.log(err));
                console.log("auth service array"+myarr);
                return myarr;
  }

  //Deleting an event
  public deleteEvent(id:string){
    fetch('http://localhost:3000/api/eventdelete/'+id, {
                    method: 'DELETE'
                }).then((res) => res.json())
                .then((data) => {                  
                console.log(data);
                
                }).then(()=>{
                  const dialogRef1 = this.dialog.open(SuccessmodalComponent,
                    {
                     width: '500px',
                     height: '400px',
                    data: {text:"Event registration successfully deleted!"}
                 }
                 );
                 dialogRef1.afterClosed().subscribe(result => {
                  window.location.reload();
               });}).catch((err)=>console.log(err));
  }

  //Check if user is logged in or not based on local storage
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }


  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`/api/${type}`, user);
    } 
    else{
      base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  //register API call
  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }
  //login API call
  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  //Save an event
  public eventSave(reg: any): any {
  fetch('http://localhost:3000/api/eventsave', {
                    method: 'POST',
                    headers : {"Content-Type":"application/json"},
                    body:JSON.stringify(reg)
                }).then((res) => res.json())
                .then((data) =>  {console.log(data);
                  }).then(()=>{const dialogRef1 = this.dialog.open(SuccessmodalComponent,
                    {
                     width: '500px',
                     height: '400px',
                    data: {text:"Event registration successfully saved!"}
                 });
                 dialogRef1.afterClosed().subscribe(result => {
                  window.location.reload();
               });
                }).catch((err)=>console.log(err));
                
  }
  //Update an event
  public update(reg: any): any{
    fetch('http://localhost:3000/api/eventupdate/'+reg._id, {
                    method: 'PUT',
                    headers : {"Content-Type":"application/json"},
                    body:JSON.stringify(reg)
                }).then((res) => res.json())
                .then((data) =>  console.log(data)).then(()=>{
                  const dialogRef1 = this.dialog.open(SuccessmodalComponent,
                  {
                   width: '500px',
                   height: '400px',
                  data: {text:"Event registration successfully updated!"}
               });
               dialogRef1.afterClosed().subscribe(result => {
                 window.location.reload();
              });}).catch((err)=>console.log(err));
                
                
  }

  //profile API
  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  //logout function based on localstorage and removing the token
  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }
}
