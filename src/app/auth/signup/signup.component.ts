import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as fromUIReducer from '../../store/ui/ui.reducer';
import * as fromAuthActions from '../store/auth.actions';
import * as fromAuthReducer from '../store/auth.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    
  private maxDate:Date;  
  private loginRequestSent$:Observable<boolean> = this.store.select(fromUIReducer.getIsLoading);
  private signupError$:Observable<boolean> = this.store.select(fromAuthReducer.getSignupError);
  private signupErrorMsg$:Observable<string> = this.store.select(fromAuthReducer.getSignupErrorMsg);

  constructor(
    private authService:AuthService,    
    private store:Store<fromAuthReducer.AuthState>
  ) { }

  ngOnInit() {
    this.maxDate=new Date();    
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);       
  }  

  private onFormSubmit(f:NgForm){       
    /*this.authService.registerUser({
      email: f.value.emailInput,
      password: f.value.passwordInput
    });*/   
    this.store.dispatch(
      new fromAuthActions.SignupUser(
        f.value.emailInput, f.value.passwordInput
      )
    );
  }

}
