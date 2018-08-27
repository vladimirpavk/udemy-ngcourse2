import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  public isTrainingStarted=false;
  public trainingName:string;

  constructor() { }

  ngOnInit() {
  }

  private trainingStarted(trainingName:string):void{
    this.trainingName = trainingName;    
    this.isTrainingStarted = true;    
  }
}
