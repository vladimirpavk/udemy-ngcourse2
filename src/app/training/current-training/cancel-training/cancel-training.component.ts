import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ExerciseData } from "../current-training.component";

@Component({
  selector: 'app-cancel-training',
  templateUrl: './cancel-training.component.html',
  styleUrls: ['./cancel-training.component.css']
})
export class CancelTrainingComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CancelTrainingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExerciseData) {}

  ngOnInit() { 
  }

  actionButtonClicked(action:string){
    this.dialogRef.close(action);
  }

}
