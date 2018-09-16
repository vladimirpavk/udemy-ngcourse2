import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSelect } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as fromTraining from '../store/training.reducer';
import * as fromTrainingActions from '../store/training.actions';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
 
  private availableExercises:Observable<fromTraining.TrainingState>=this.store.select('trainingState');

  constructor(
    private trainingService:TrainingService,
    private store:Store<fromApp.AppState>
  ) { }

  ngOnInit() { 
    this.trainingService.fetchExercises();                              
  }

  startExercise(form:NgForm){   
    this.store.dispatch(new fromTrainingActions.SetActiveExercise( (<Exercise>(form.controls["selectExercise"].value)) ));

    //this.trainingService.startTraining(<Exercise>(form.controls["selectExercise"].value));     
  }

}
