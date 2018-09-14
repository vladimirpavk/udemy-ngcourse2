import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { UIState } from '../../store/ui/ui.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    
  private maxDate:Date;  
  private loginRequestSent$:Observable<UIState> = this.store.select('uiState');  

  constructor(
    private authService:AuthService,
    private store:Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.maxDate=new Date();    
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);      
  }  

  private onFormSubmit(f:NgForm){       
    this.authService.registerUser({
      email: f.value.emailInput,
      password: f.value.passwordInput
    });
  }

}
