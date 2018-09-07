import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  @Output("trainingStarted")  public trainingStarted:EventEmitter<string> = new EventEmitter<string>();  
  private availableExercies:Exercise[];
  private availableExercisesChangedSubscription: Subscription;

  constructor(
    private trainingService:TrainingService
  ) { }

  ngOnInit() { 
    this.trainingService.fetchExercises();                            
    this.availableExercisesChangedSubscription = this.trainingService.availableExercisesChanged.subscribe(
      (ex:Exercise[])=>{           
        this.availableExercies = ex;
      }
    )              
  }

  ngOnDestroy(){
    this.availableExercisesChangedSubscription.unsubscribe();
  }

  startExercise(form:NgForm){   
     this.trainingService.startTraining(<Exercise>(form.controls["selectExercise"].value));     
  }

}
