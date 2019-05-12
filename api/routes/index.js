var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});
const nodemailer = require('nodemailer');

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlEvent=require('../controllers/eventcontroller');


// Profile
router.get('/profile', auth, ctrlProfile.profileRead);

// Authentication for login and register
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
// Event API's
router.post('/eventread', ctrlEvent.list );
router.post('/eventsave',ctrlEvent.post);
router.put('/eventupdate/:registerID',ctrlEvent.put);
router.delete('/eventdelete/:registerID',ctrlEvent.delete);
router.get('/eventread/:uid',ctrlEvent.some);


// Email/SMS API for registration of the user for the event
router.post('/sendreg', (req, res) => {

    const outputData = `
    <p>You have successfully registered for the event!</p>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>`;
  
    let transporter1 = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service:'Gmail',
        port: 587,
        secure: false,
        auth: {
            user: 'meanstack04@gmail.com', // generated ethereal user
            pass: 'webdesign123'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
  
    let HelperOptions1 = {
        from: '"MeanStack" <meanstack04@gmail.com>', // sender address
        to: [`${req.body.email}`],// list of receivers
        bcc : [`${req.body.phone}@tmomail.net`,`${req.body.phone}@txt.att.net`,`${req.body.phone}@messaging.sprintpcs.com`],
        subject: 'You have registered for the event!', // Subject line
        text: 'Hello ! You have registered for the event', // plain text body
        html: outputData // html body
    };
  
    transporter1.sendMail(HelperOptions1, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("The message was sent!");
        console.log(info);
    });
    
   });
   
// Email/SMS API for registration of the user
router.post('/send', (req, res) => {

  const outputData = `
  <p>You have successfully registered for our website!</p>
  <h3>${req.body.name}'s Details</h3>
  <ul>  
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Email: ${req.body.phone}</li>
  </ul>`;

  let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service:'Gmail',
      port: 587,
      secure: false,
      auth: {
          user: 'meanstack04@gmail.com', // generated ethereal user
          pass: 'webdesign123'  // generated ethereal password
      },
      tls: {
          rejectUnauthorized: false
      }
  });

  let HelperOptions = {
      from: '"MeanStack" <meanstack04@gmail.com>', // sender address
      to: [`${req.body.email}`],// list of receivers
      bcc : ['meanstack04@gmail.com',`${req.body.phone}@tmomail.net`,`${req.body.phone}@txt.att.net`,`${req.body.phone}@messaging.sprintpcs.com`],
      subject: 'New User Registered', // Subject line
      text: 'Hello ! You have registered for MeanStack', // plain text body
      html: outputData // html body
  };

  transporter.sendMail(HelperOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log("The message was sent!");
      console.log(info);
  });
  
 });

module.exports = router;
