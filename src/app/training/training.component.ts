import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Exercise } from './exercise.model';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  private subs:Subscription;

  public isTrainingStarted=false;

  constructor(private trainingService:TrainingService) { }

  ngOnInit() {
    this.subs = this.trainingService.trainingChanged.subscribe(
      (ex:Exercise)=>{
        if(ex){
          this.isTrainingStarted = true;
        }
        else{
          this.isTrainingStarted = false;
        }
      }
    )
  } 

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
