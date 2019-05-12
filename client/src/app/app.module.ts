import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationService } from './authentication.service';
import {AlertService} from './alert.service';
import {EventsAPIService} from './events-api.service';
import { AuthGuardService } from './auth-guard.service';
import { EventdetailsComponent } from './eventdetails/eventdetails.component';
import { DialogformComponent } from './dialogform/dialogform.component';
import { AllEventsComponent } from './all-events/all-events.component';
import { EventDetailsPageComponent } from './event-details-page/event-details-page.component';
import { SearchEventComponent } from './search-event/search-event.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { UpdateModalComponent } from './update-modal/update-modal.component';
import { PleaseLoginComponent } from './please-login/please-login.component';
import { SuccessmodalComponent } from './successmodal/successmodal.component';

const routes: Routes = [
//Path or routes
  {path : '',component : LandingPageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'eventdetails', component: EventdetailsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },

  {path :'eventsBySearchName/:searchName/:id2/:id3',component : SearchEventComponent},

  {path : 'allEvents',component : AllEventsComponent},

  {path :'eventsByCategory',component : SearchEventComponent},

{path :'eventsByCategory/:searchName',component : SearchEventComponent},

{path :'eventsByCategory/:id',component : SearchEventComponent},

{path :'eventsDetailPage/:id',component : EventDetailsPageComponent},

{path : 'allEvents/:id',component : AllEventsComponent},

{path : 'aboutus',component : AboutusComponent},
];

//Contains all the components which the enetire project is built on
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EventdetailsComponent,
    DialogformComponent,
    AllEventsComponent,
    EventDetailsPageComponent,
    SearchEventComponent,
    LandingPageComponent,
    AboutusComponent,
    UpdateModalComponent,
    PleaseLoginComponent,
    SuccessmodalComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyCtIpco3_1Ja5GH7TNgaDdV5CeUCgR4hek"
    })
  ],
  //Modules which pops up for performing CRUD like add update and delete
  entryComponents:[
    DialogformComponent,
    UpdateModalComponent,
    PleaseLoginComponent,
    SuccessmodalComponent
  ],

  //Provides a list of all the services we are using throughout the project
  providers: [
    AuthenticationService, 
    AlertService,
    AuthGuardService,
    EventsAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
