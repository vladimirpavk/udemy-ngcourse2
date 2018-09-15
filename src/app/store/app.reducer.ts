import * as AuthReducer from "../auth/store/auth.reducer";
import * as UIReducer from './ui/ui.reducer';
import * as TrainingReducer from '../training/store/training.reducer';

import { ActionReducerMap } from "@ngrx/store";

export interface AppState{
    'authState':AuthReducer.AuthState;
    'uiState': UIReducer.UIState;
    'trainingState': TrainingReducer.TrainingState
}

export const reducers:ActionReducerMap<AppState> = {
    'authState': AuthReducer.reducer,
    'uiState': UIReducer.reducer,
    'trainingState': TrainingReducer.reducer
}
