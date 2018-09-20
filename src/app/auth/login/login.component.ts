import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, interval } from 'rxjs';
import { mergeMap, switchMap, map } from 'rxjs/operators';

import { AuthService } from '../auth.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as fromAuthActions from '../store/auth.actions';
import { AuthState }from '../store/auth.reducer';
import { UIState } from '../../store/ui/ui.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  private loginForm:FormGroup;  
  private loginRequestSent$:Observable<boolean> = this.store.select('uiState').pipe(map((uistate:UIState)=>uistate.isLoading ));
  private tryedToLogin$:Observable<boolean> = this.store.select('authState').pipe(map((authState: AuthState)=>authState.tryedToLogin));
  private isAuthenticated$:Observable<boolean> = this.store.select('authState').pipe(map((authState: AuthState)=>authState.isAuthenticated));

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
  }

  private onFormSubmitted(){   
    /*this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });*/    
    this.store.dispatch(new fromAuthActions.LoginUser(
      this.loginForm.value.email,
      this.loginForm.value.password
    ));  
  }

}
