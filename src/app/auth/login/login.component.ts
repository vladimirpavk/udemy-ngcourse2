import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm:FormGroup;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.loginForm=new FormGroup(
      {
        'email': new FormControl('', [Validators.email, Validators.required]),
        'password': new FormControl('', [Validators.minLength(6), Validators.maxLength(12), Validators.required])
      }
    )
  }

  private onFormSubmitted(){
    //console.log(this.loginForm);
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

}
