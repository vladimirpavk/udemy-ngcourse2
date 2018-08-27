import { Output, Component, OnInit, EventEmitter, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CancelTrainingComponent } from './cancel-training/cancel-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  @Input("currentTrainingName") currentTrainingName:string;

  private currentTrainingProgress:number=0;
  private intervalHandler;
  @Output() 
  public nextExercise:EventEmitter<void>=new EventEmitter<void>();

  constructor(private cancelDialog:MatDialog) { }

  ngOnInit() {    

    this.intervalHandler=setInterval(()=>{
      this.currentTrainingProgress=this.currentTrainingProgress+10;
      if(this.currentTrainingProgress>=100){
        clearInterval(this.intervalHandler);
      }
    },500);

    
  }

  private stopExercise(){
    //clearInterval(this.intervalHandler);
    const cancelDialogRef:MatDialogRef<CancelTrainingComponent> = this.cancelDialog.open(CancelTrainingComponent);
  }

  private goToNext(){
    console.log("Next exercise...");
    this.nextExercise.emit();
  }

}
