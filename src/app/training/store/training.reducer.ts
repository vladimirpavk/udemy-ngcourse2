import * as TrainingActions from './training.actions';
import { Exercise } from '../exercise.model';

export interface TrainingState{
    'availableExercies': Exercise[],
    'finishedExercies': Exercise[],
    'activeExercise': Exercise
}

export const initialState:TrainingState={
    'availableExercies': [],
    'finishedExercies': [],
    'activeExercise': null
}

export function reducer(state:TrainingState=initialState, action:TrainingActions.TrainingActions):TrainingState{

        switch(action.type){
            case(TrainingActions.AVAILABLE_EXERCIES_FETCHED):{
                return {...state, 'availableExercies': (<TrainingActions.AvailableExerciesFetched>action).availableExercies };
            }
            case(TrainingActions.FINISHED_EXERCIES_FETCHED):{
                return {...state, 'finishedExercies': (<TrainingActions.FinishedExerciesFetched>action).finishedExercies };
            }
            case(TrainingActions.SET_ACTIVE_EXERCISE):{
                return {...state, 'activeExercise': (<TrainingActions.SetActiveExercise>action).activeExercise}
            }
            case(TrainingActions.RESET_ACTIVE_EXERCISE):{
                return {...state, 'activeExercise': null}
            }
            default:
                return state;
        }        
}

