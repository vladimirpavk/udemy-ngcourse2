import { EventEmitter, Injectable } from "@angular/core";
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject, Subscription } from "rxjs";
import { map, take } from 'rxjs/operators';

import { Exercise } from "./exercise.model";

import { Store } from '@ngrx/store';
import * as fromUIActions from '../store/ui/ui.actions';
import * as fromApp from '../store/app.reducer';
import * as fromTrainingActions from './store/training.actions';
import * as fromTraining from './store/training.reducer';

@Injectable()
export class TrainingService{

    private fbSubs:Subscription[] = [];
   
    constructor(
        private db:AngularFirestore,
        private store:Store<fromApp.AppState>
    ){}

    public fetchExercises():void{             
        this.fbSubs.push(this.db.collection('availableExercises').snapshotChanges()
        .pipe(
          map((docArray)=>{
            return docArray.map((doc)=>{
              return {
                id: doc.payload.doc['id'],
                name: doc.payload.doc.data()['name'],
                duration: doc.payload.doc.data()['duration'],
                calories: doc.payload.doc.data()['calories']
              }
            })
          })      
        )
        .subscribe(            
            (exercies:Exercise[])=>{
                this.store.dispatch(new fromTrainingActions.AvailableExerciesFetched(exercies));;                            
            }
        )); 
    }

    public startTraining(exercise:Exercise){
        this.store.dispatch(new fromTrainingActions.SetActiveExercise(exercise));       
    }

    private retrieveActiveExerciseFromStore():Exercise{
        let currentExercise:Exercise = null;

        this.store.select('trainingState').pipe(
            map(
                (trState:fromTraining.TrainingState)=>{
                    return trState.activeExercise
                }
            ),
            take(1)
        ).subscribe(
            (res:Exercise)=>{
                currentExercise=res;
            }
        );

        return currentExercise;
    }

    public completeExercise():void{        
        this.addExerciseToDb( 
            { 
                ...this.retrieveActiveExerciseFromStore(), 
                date:new Date(), 
                state:'completed' 
            });
        
        this.store.dispatch(new fromTrainingActions.ResetActiveExercise());
    }

    public cancelExercise(progress:number):void{
        let currentExercise=this.retrieveActiveExerciseFromStore();
        
        this.addExerciseToDb(
            {
                ...currentExercise,
                duration: currentExercise.duration * (progress/100),
                calories: currentExercise.calories * (progress/100),
                date: new Date(),
                state: 'canceled' 
            });
        this.store.dispatch(new fromTrainingActions.ResetActiveExercise());
    }

    private addExerciseToDb(exercies:Exercise){        
        this.db.collection('finishedExercies').add(exercies);
    }

    public fetchFinishedExercises():void{
        this.fbSubs.push(this.db.collection('finishedExercies').valueChanges()
        .pipe(
            take(1)
        )
        .subscribe(
            (exercises:Exercise[]) =>{
                this.store.dispatch(new fromTrainingActions.FinishedExerciesFetched(exercises));                
            }
        ));        
    }

    public cancelSubs(){      
        this.fbSubs.forEach(
            (sub:Subscription)=>{
                sub.unsubscribe();
            }
        )
    }

}