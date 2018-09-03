import { Component, OnInit } from '@angular/core';
import { Exercise } from './exercise.model';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  public isTrainingStarted=false;
  public trainingName:string;

  constructor(private trainingService:TrainingService) { }

  ngOnInit() {
    this.trainingService.trainingStarted.subscribe(
      (ex:Exercise)=>{
        this.isTrainingStarted = true;
        this.trainingName = ex.name;
      }
    )
  }

  private trainingStarted(exercise:Exercise):void{
    /*this.trainingName = exercise.name;
    this.isTrainingStarted = true;    */
  }
}
