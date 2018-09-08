import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private loginForm:FormGroup;
  private loginRequestSent = false;

  private authChangedSubs:Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.loginForm=new FormGroup(
      {
        'email': new FormControl('', [Validators.email, Validators.required]),
        'password': new FormControl('', [Validators.minLength(6), Validators.maxLength(12), Validators.required])
      }
    );

    this.authChangedSubs = this.authService.authChanged.subscribe(
      (authState:boolean)=>{        
        this.loginRequestSent = false;
      }
    );
  }

  ngOnDestroy(){
    this.authChangedSubs.unsubscribe();
  }

  private onFormSubmitted(){   
    this.loginRequestSent = true;    

    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });    
  }

}
