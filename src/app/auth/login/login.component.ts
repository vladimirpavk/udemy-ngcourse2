import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { AuthState } from '../store/auth.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  private loginForm:FormGroup;
  private loginRequestSent$:Observable<AuthState> = this.store.select('authState');
  //private loginRequestSent$:Observable<boolean>;
  //private loginRequestSent:boolean;

  constructor(
    private authService:AuthService,
    private store:Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.loginForm=new FormGroup(
      {
        'email': new FormControl('', [Validators.email, Validators.required]),
        'password': new FormControl('', [Validators.minLength(6), Validators.maxLength(12), Validators.required])
      }
    );

    /*this.loginRequestSent$ = this.store.pipe(
      map(res=>res.firstReducer['isLoading'])
    );*/
    
  }

  private onFormSubmitted(){   
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });    
  }

}
