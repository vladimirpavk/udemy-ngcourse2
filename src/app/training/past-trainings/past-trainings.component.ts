import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

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

  constructor(private trainingService:TrainingService) {

   }

  ngOnInit() {
    this.dataSource.data = this.trainingService.getCompletedOrCanceledExercises();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private doFiltering(filter:string):void{
    this.dataSource.filter = filter.trim().toLocaleLowerCase();
  }

}
