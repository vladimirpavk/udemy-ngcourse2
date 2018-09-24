import * as AuthActions from "./auth.actions";
import { ActionReducerMap, createSelector, createFeatureSelector } from "@ngrx/store";
import { TrainingState } from "../../training/store/training.reducer";


export interface AuthState{
    'tryedToLogin': boolean,    
    'isAuthenticated': boolean,

    'signupError': boolean,
    'signupErrorMsg': string
}

const initialState:AuthState = {    
    'tryedToLogin': false,
    'isAuthenticated': false,

    'signupError': false,
    'signupErrorMsg': ''
}

export function reducer(state:AuthState=initialState, 
    action:AuthActions.AuthActions):AuthState{

        switch(action.type){           
            case(AuthActions.USER_AUTHENTICATED):{
                return {...state, 'isAuthenticated':true}
            }
            case(AuthActions.USER_NOT_AUTHENTICATED):{
                return {...state, 'isAuthenticated':false}
            }
            case(AuthActions.TRYED_TO_LOGIN):{
                return {...state, 'tryedToLogin':true}
            }
            case(AuthActions.NOT_TRYED_TO_LOGIN):{
                return {...state, 'tryedToLogin': false}
            }
            case(AuthActions.SIGNUP_FAILED):{
                return {...state, 'signupError' : true, 'signupErrorMsg': (<AuthActions.SignupFailed>action).errorMsg }
            }
            case(AuthActions.SIGNUP_SUCCESS):{
                return {...state, 'signupError' : false, 'signupErrorMsg': '', 'isAuthenticated' : true}
            }
            default:
            return state;
        }
}

export const getAuthState = createFeatureSelector<AuthState>('authState');

export const getTryedToLogin = createSelector(getAuthState, (state:AuthState)=>state.tryedToLogin);
export const getIsAuthenticated = createSelector(getAuthState, (state:AuthState)=>state.isAuthenticated);
export const getSignupError = createSelector(getAuthState, (state:AuthState)=>state.signupError);
export const getSignupErrorMsg = createSelector(getAuthState, (state:AuthState)=>state.signupErrorMsg);