import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  private maxDate:Date;
  @ViewChild("passwordInput") pass:NgModel;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.maxDate=new Date();
    console.log(this.maxDate);
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  private onFormSubmit(f:NgForm){
    this.authService.registerUser({
      email: f.value.emailInput,
      password: f.value.passwordInput
    });
  }

}
