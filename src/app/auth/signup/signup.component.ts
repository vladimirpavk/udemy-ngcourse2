import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  private maxDate:Date;
  @ViewChild("passwordInput") pass:NgModel;

  constructor() { }

  ngOnInit() {
    this.maxDate=new Date();
    console.log(this.maxDate);
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  private onFormSubmit(f:NgForm){
    console.log(f);  
  }

}
