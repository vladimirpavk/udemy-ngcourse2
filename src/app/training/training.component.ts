import { Component, OnInit } from '@angular/core';
import { Exercise } from './exercise.model';

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

  private trainingStarted(exercise:Exercise):void{
    this.trainingName = exercise.name;
    this.isTrainingStarted = true;    
  }
}
