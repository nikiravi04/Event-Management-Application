import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    password: '',
    phone : ''
  };

  loginForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,private auth: AuthenticationService, private router: Router) {

  }
  //Validators are used for validation of email and password
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
  }
  //login function call
  login() {
    this.auth.login(this.credentials).subscribe(() => {
      //navigate to the user's profile page if the login is successful
      this.router.navigateByUrl('/profile');
    }, (error) => {
      console.log(error);
    }); 
  }

}
