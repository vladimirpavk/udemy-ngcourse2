import { EventEmitter, Injectable } from "@angular/core";
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from "rxjs";
import { map, subscribeOn } from 'rxjs/operators';

import { Exercise } from "./exercise.model";

@Injectable()
export class TrainingService{

    public trainingChanged:Subject<Exercise> = new Subject<Exercise>();
    public availableExercisesChanged:Subject<Exercise[]> = new Subject<Exercise[]>();

    private availableExercises: Exercise[] = [        
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }        
    ];    

    public currentExercise:Exercise = null;
    private exercies:Exercise[] = [];

    constructor(private db:AngularFirestore){}

    public fetchExercises():void{                       
        this.db.collection('availableExercises').snapshotChanges()
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
                this.availableExercises = exercies;
                this.availableExercisesChanged.next(this.availableExercises);
            }
        )       
    }

    public getExercises():Exercise[]{
        this.fetchExercises();
        return this.availableExercises;
    }

    public startTraining(exercise:Exercise){
        this.currentExercise = exercise;
        this.trainingChanged.next({ ...exercise });
    }

    public completeExercise():void{
        this.exercies.push( 
            { 
                ...this.currentExercise, 
                date:new Date(), 
                state:'completed' 
            });
        this.trainingChanged.next(null);
        this.currentExercise = null;
    }

    public cancelExercise(progress:number):void{
        this.exercies.push(
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

    public getCompletedOrCanceledExercises():Exercise[]{
        return this.exercies.slice();
    }
}