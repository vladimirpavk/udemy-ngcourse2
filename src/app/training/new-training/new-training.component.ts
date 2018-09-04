import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output("trainingStarted")  public trainingStarted:EventEmitter<string> = new EventEmitter<string>();  

  constructor(private trainingService:TrainingService) { }

  ngOnInit() {    
  }

  startExercise(form:NgForm){   
     this.trainingService.startTraining(<Exercise>(form.controls["selectExercise"].value));
     //console.log(form);
  }

}
