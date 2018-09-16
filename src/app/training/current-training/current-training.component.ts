import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { map, tap, take } from 'rxjs/operators';

import { CancelTrainingComponent } from './cancel-training/cancel-training.component';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as fromTraining from '../store/training.reducer';
import * as fromTrainingActions from '../store/training.actions';

export interface ExerciseData{
  name:string,
  progress: number
}

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
    
  private currentTrainingProgress:number=0;
  private currentExercise:Exercise;
  private intervalHandler;
 
  constructor(
    private cancelDialog:MatDialog,
    private trainingService: TrainingService,
    private store:Store<fromApp.AppState>
  ) { }

  ngOnInit() {    
    this.store.select('trainingState').pipe(
      map( (trState:fromTraining.TrainingState) => trState.activeExercise ),
      take(1)
    ).subscribe(
      (activeExercise:Exercise)=>{
        this.currentExercise = activeExercise;
      }
    )
    this.activateExercise();
  }

  private activateExercise(){
    const step=this.currentExercise.duration/100*1000;    
    this.intervalHandler=setInterval(()=>{
      this.currentTrainingProgress=this.currentTrainingProgress+1;
      if(this.currentTrainingProgress>=100){
        //exercise completed successfully
         clearInterval(this.intervalHandler);
         this.trainingService.completeExercise();
      }
    },step);
  }

  private stopExercise(){
    clearInterval(this.intervalHandler);
    const cancelDialogRef:MatDialogRef<CancelTrainingComponent> = this.cancelDialog.open(CancelTrainingComponent,
    {
      data:{
        name: this.currentExercise.name,
        progress: this.currentTrainingProgress
      }
    });
    cancelDialogRef.afterClosed().subscribe((result)=>{
      if(result=='OK'){
        this.trainingService.cancelExercise(this.currentTrainingProgress);
      }
      else
      {      
        this.activateExercise();
      }
    });
  }

  /*private goToNext(){
    console.log("Next exercise...");
    this.nextExercise.emit();
  }*/

}
