import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  
  @ViewChild("passwordInput") pass:NgModel;
  private maxDate:Date;  
  private loginRequestSent = false;

  private authChangedSubs:Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.maxDate=new Date();    
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    
    this.authChangedSubs = this.authService.authChanged.subscribe(
      (authState:boolean)=>{        
        this.loginRequestSent = false;
      }
    );
  }

  ngOnDestroy(){
    this.authChangedSubs.unsubscribe();
  }

  private onFormSubmit(f:NgForm){    
    this.loginRequestSent=true;

    this.authService.registerUser({
      email: f.value.emailInput,
      password: f.value.passwordInput
    });
  }

}
