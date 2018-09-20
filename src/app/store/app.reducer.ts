import * as AuthReducer from "../auth/store/auth.reducer";
import * as UIReducer from './ui/ui.reducer';
import * as TrainingReducer from '../training/store/training.reducer';

import { ActionReducerMap } from "@ngrx/store";

export interface AppState{    
    'uiState': UIReducer.UIState,    
}

export const reducers:ActionReducerMap<AppState> = {    
    'uiState': UIReducer.reducer,    
}
