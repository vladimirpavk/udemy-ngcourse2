import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output("trainingStarted")  public trainingStarted:EventEmitter<string> = new EventEmitter<string>();  
  private availableExercies:Observable<Exercise[]>;  

  constructor(
    private db:AngularFirestore,
    private trainingService:TrainingService
  ) { }

  ngOnInit() {           
        /*this.availableExercies = 
          this.db.collection('availableExercises').snapshotChanges()
            .pipe(
              map((docArray)=>{
                let exerciseArray:Exercise[] = [];
                for(let doc of docArray){
                  exerciseArray.push({
                    id: doc.payload.doc.id,
                    name: doc.payload.doc.data()['name'],
                    duration: doc.payload.doc.data()['duration'],
                    calories: doc.payload.doc.data()['calories']
                  });
                }               
                return exerciseArray;
              })      
            );*/         
            
      //ili prethodno može i elegantnije da se napiše      
          this.availableExercies = this.db.collection('availableExercises').snapshotChanges()
            .pipe(
              map((docArray)=>{
                return docArray.map((doc)=>{
                  return {
                    id: doc.payload.doc.id,
                    name: doc.payload.doc.data()['name'],
                    duration: doc.payload.doc.data()['duration'],
                    calories: doc.payload.doc.data()['calories']
                  }
                })
              })      
            );
  }

  startExercise(form:NgForm){   
     this.trainingService.startTraining(<Exercise>(form.controls["selectExercise"].value));
     //console.log(form);
  }

}
