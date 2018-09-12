import * as AuthReducer from "../auth/store/auth.reducer";
import { ActionReducerMap } from "@ngrx/store";

export interface AppState{
    'authState':AuthReducer.AuthState;
}

export const reducers:ActionReducerMap<AppState> = {
    'authState': AuthReducer.reducer
}
