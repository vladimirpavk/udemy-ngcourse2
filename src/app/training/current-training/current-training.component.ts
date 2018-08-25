import { Output, Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  private currentTrainingProgress:number=0;
  private intervalHandler;
  @Output() 
  public nextExercise:EventEmitter<void>=new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    this.intervalHandler=setInterval(()=>{
      this.currentTrainingProgress=this.currentTrainingProgress+10;
      if(this.currentTrainingProgress>100){
        clearInterval(this.intervalHandler);
      }
    },500);
  }

  private stopExercise(){
    clearInterval(this.intervalHandler);
  }

  private goToNext(){
    console.log("Next exercise...");
    this.nextExercise.emit();
  }

}
