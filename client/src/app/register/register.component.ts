import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  credentials: TokenPayload = {
    email: '',
    name: '',
    phone :'',
    password: ''
  };

  regForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private auth: AuthenticationService, private router: Router,private http: HttpClient) {}

  ngOnInit() {
    this.regForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        password: ['', Validators.required]
    });
  }
//Register call
  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);})

    //Send/SMS email for registration of user
    this.auth.sendEmail(this.credentials.email,this.credentials.name,this.credentials.phone).subscribe(success => {
      console.log(success);
    }, error => {
      console.error(error);
    });
   
  }

}