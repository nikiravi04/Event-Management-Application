# Event Management Application

![Untitled design (1)](https://user-images.githubusercontent.com/46007043/56611789-b1b4b300-65e0-11e9-9a31-8c8ddc9e83da.png)

## What is our project about?
Getaround is a simple and easy to use option for event planning and registering. We make use of the EventBrite API to get the events dynamically on our website , which helps us get worldwide events and keeps our website up to date with the events.

### Backend
The REST API built with Node,Express and MongoDB with Mongoose to manage the schema. Used Nodemailer to send SMS/Email notifcations. Passport is used to authenticate the login/register process.

### Frontend
The frontend is built with Angular CLI. @angular/router to manage navigation between routes

### Usecases
* Login
* Register
* View Events from the EventBrite API
* Search based on event name
* Search based on location
* Profile page with user details and events registered
* Detailed view of events
* Google map view of the event location
* Facebook share of the event
* Email/SMS notifications on registration of website
* Email/SMS notifcations on registration of events

### Build the app
* Open one terminal
* npm install
* npm start (runs on port 3000)
* Open another terminal ,navigate to the client folder
* npm install to install the angular dependancies
* npm run start (http://localhost:4200/)

To run, you just have MongoDB installed and running, and NodeJS installed.

* Start MongoDB
* Clone the repo
* `npm install` to install API dependencies and `npm start` to start the API
* Open a new terminal and navigate to the `client` directory, `npm install` to setup the Angular dependencies, and `npm start` to start the local development server
* Open http://localhost:4200 to see the application
