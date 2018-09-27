import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model'


//BE AWARE OFFSET CAN NOT BE USED WITH CLOUDFIRE
@Injectable()
export class PastTrainingDataSource extends DataSource<Exercise>{
    
    //BehaviorSubject must have initial value
    private exerciseSubject=new BehaviorSubject<Exercise[]>([]);
    private loadingSubject=new BehaviorSubject<boolean>(false);
    
    //UI API
    public loadingSubject$:Observable<boolean>=this.loadingSubject.asObservable();
    public exerciseSubject$:Observable<Exercise[]>=this.exerciseSubject.asObservable();

    constructor(private trainingService:TrainingService){
        super();
    }

    public connect(collectionViewer:CollectionViewer):Observable<Exercise[]>{
        return this.exerciseSubject.asObservable();
    }

    public disconnect():void{

    }

}