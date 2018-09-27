import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as fromTraining from '../store/training.reducer';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {

  private displayedColumns:string[] = [
    'name',
    'duration',
    'calories',
    'date',
    'state'
  ];

  @ViewChild(MatSort) private sort:MatSort;
  @ViewChild("paginator") private paginator:MatPaginator;

  private dataSource : MatTableDataSource<Exercise> = 
    new MatTableDataSource<Exercise>();

 // private dataSource:MyDataSource=new MyDataSource(this.store);

  constructor(
    private trainingService:TrainingService,
    private store:Store<fromApp.AppState>
  ) {

   }

  ngOnInit() {        
    this.store.select('trainingState').pipe(
      map(
        (trState:fromTraining.TrainingState)=>trState.finishedExercies
      ))
      .subscribe(
        (exercies:Exercise[])=>{
          this.dataSource.data = exercies;
        }        
      );
    
    this.trainingService.fetchFinishedExercises();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private doFiltering(filter:string):void{
    this.dataSource.filter = filter.trim().toLocaleLowerCase();
  }
}

/*export class MyDataSource extends DataSource<any>{
  
  constructor(
    private store:Store<fromApp.AppState>
  ){
    super();
  }

  connect() : Observable<Exercise[]> {
    return this.store.select('trainingState').pipe(
      map(
        (trState:fromTraining.TrainingState)=>trState.finishedExercies
      ));    
  }

  disconnect() {}

}*/
