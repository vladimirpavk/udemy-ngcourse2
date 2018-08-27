import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output("trainingStarted")  public trainingStarted:EventEmitter<string> = new EventEmitter<string>();
  @ViewChild("trainingSelect") select: MatSelect;

  constructor() { }

  ngOnInit() {
  }

  startExercise(){   
    this.trainingStarted.emit(this.select.value);
  }

}
