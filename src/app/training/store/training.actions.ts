import { Action } from '@ngrx/store';
import { Exercise } from '../exercise.model';

export const AVAILABLE_EXERCIES_FETCHED:string = 'AVAILABLE_EXERCIES_FETCHED';
export const FINISHED_EXERCIES_FETCHED:string = 'FINISHED_EXERCIES_FETCHED';

export class AvailableExerciesFetched implements Action{
    public readonly type:string = AVAILABLE_EXERCIES_FETCHED;
    constructor(
        public availableExercies:Exercise[]
    ){}
}

export class FinishedExerciesFetched implements Action{
    public readonly type:string = FINISHED_EXERCIES_FETCHED;
    constructor(
        public finishedExercies:Exercise[]
    ){}
}

export type TrainingActions = AvailableExerciesFetched | FinishedExerciesFetched;