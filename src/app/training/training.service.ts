import { Exercise } from "./exercise.model";
import { EventEmitter } from "@angular/core";

export class TrainingService{

    public trainingStarted:EventEmitter<Exercise> = new EventEmitter<Exercise>();

    private availableExercises: Exercise[] = [        
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }        
    ];    
    
    public getExercises():Exercise[]{
        return this.availableExercises;
    }

    public startTraining(exercise:Exercise){
        this.trainingStarted.emit(exercise);
    }
}