import * as TrainingActions from './training.actions';
import { Exercise } from '../exercise.model';

export interface TrainingState{
    'availableExercies': Exercise[],
    'finishedExercies': Exercise[]
}

export const initialState:TrainingState={
    'availableExercies': [],
    'finishedExercies': []
}

export function reducer(state:TrainingState=initialState, action:TrainingActions.TrainingActions):TrainingState{

        switch(action.type){
            case(TrainingActions.AVAILABLE_EXERCIES_FETCHED):{
                return {...state, 'availableExercies': (<TrainingActions.AvailableExerciesFetched>action).availableExercies };
            }
            case(TrainingActions.FINISHED_EXERCIES_FETCHED):{
                return {...state, 'finishedExercies': (<TrainingActions.FinishedExerciesFetched>action).finishedExercies };
            }
            default:
                return state;
        }        
}

