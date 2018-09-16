import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';

import { Subscription } from 'rxjs';

import { Exercise } from './exercise.model';
import { TrainingService } from './training.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import* as fromTraining from './store/training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  private subs:Subscription;

  public isTrainingStarted=false;

  constructor(
    private trainingService:TrainingService,
    private store:Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.subs = this.store.select('trainingState').pipe(
      map( (trState:fromTraining.TrainingState)=> trState.activeExercise )
    )
    .subscribe(
      (ex:Exercise)=>{
        if(ex){
          this.isTrainingStarted = true;
        }
        else{
          this.isTrainingStarted = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
