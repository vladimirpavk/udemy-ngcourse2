import { Action } from '@ngrx/store';
import { Exercise } from '../exercise.model';

export const AVAILABLE_EXERCIES_FETCHED:string = 'AVAILABLE_EXERCIES_FETCHED';
export const FINISHED_EXERCIES_FETCHED:string = 'FINISHED_EXERCIES_FETCHED';
export const SET_ACTIVE_EXERCISE:string = 'SET_ACTIVE_EXERCISE';
export const RESET_ACTIVE_EXERCISE:string = 'RESET_ACTIVE_EXERCISE';

export class AvailableExerciesFetched implements Action{
    public readonly type:string = AVAILABLE_EXERCIES_FETCHED;
    constructor(public availableExercies:Exercise[]){}
}

export class FinishedExerciesFetched implements Action{
    public readonly type:string = FINISHED_EXERCIES_FETCHED;
    constructor(public finishedExercies:Exercise[]){}
}

export class SetActiveExercise implements Action{
    public readonly type:string = SET_ACTIVE_EXERCISE;
    constructor(public activeExercise:Exercise){}
}

export class ResetActiveExercise implements Action{
    public readonly type:string = RESET_ACTIVE_EXERCISE;    
}

export type TrainingActions = AvailableExerciesFetched | FinishedExerciesFetched | SetActiveExercise;