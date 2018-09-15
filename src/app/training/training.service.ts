import { EventEmitter, Injectable } from "@angular/core";
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject, Subscription } from "rxjs";
import { map, subscribeOn } from 'rxjs/operators';

import { Exercise } from "./exercise.model";

import { Store } from '@ngrx/store';
import * as fromUIActions from '../store/ui/ui.actions';
import * as fromApp from '../store/app.reducer';
import * as fromTraining from './store/training.actions';

@Injectable()
export class TrainingService{

    public trainingChanged:Subject<Exercise> = new Subject<Exercise>();       
    public finishedExercisesChanged: Subject<Exercise[]> = new Subject<Exercise[]>();

    private fbSubs:Subscription[] = [];

    public currentExercise:Exercise = null;

   
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
                this.store.dispatch(new fromTraining.AvailableExerciesFetched(exercies));;                            
            }
        )); 
    }

    public startTraining(exercise:Exercise){
        this.currentExercise = exercise;
        this.trainingChanged.next({ ...exercise });
    }

    public completeExercise():void{
        this.addExerciseToDb( 
            { 
                ...this.currentExercise, 
                date:new Date(), 
                state:'completed' 
            });
        this.trainingChanged.next(null);
        this.currentExercise = null;
    }

    public cancelExercise(progress:number):void{
        this.addExerciseToDb(
            {
                ...this.currentExercise,
                duration: this.currentExercise.duration * (progress/100),
                calories: this.currentExercise.calories * (progress/100),
                date: new Date(),
                state: 'canceled' 
            });
        this.trainingChanged.next(null);
        this.currentExercise = null;
    }

    private addExerciseToDb(exercies:Exercise){
        this.fetchFinishedExercises();
        this.db.collection('finishedExercies').add(exercies);
    }

    public fetchFinishedExercises():void{
        this.fbSubs.push(this.db.collection('finishedExercies').valueChanges()
        .subscribe(
            (exercises:Exercise[]) =>{
                this.store.dispatch(new fromTraining.FinishedExerciesFetched(exercises));                
                this.finishedExercisesChanged.next(exercises);
            }
        ));        
    }

    public cancelSubs(){
        /*for(let x of this.fbSubs){
            x.unsubscribe();
        }*/
        this.fbSubs.forEach(
            (sub:Subscription)=>{
                sub.unsubscribe();
            }
        )
    }

}