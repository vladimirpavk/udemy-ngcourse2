import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { UIState } from '../../store/ui/ui.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  private loginForm:FormGroup;
  private loginRequestSent$:Observable<UIState> = this.store.select('uiState');
  
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
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });    
  }

}
