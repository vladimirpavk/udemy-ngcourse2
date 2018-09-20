import * as AuthActions from "./auth.actions";
import { ActionReducerMap } from "@ngrx/store";


export interface AuthState{
    'tryedToLogin': boolean,    
    'isAuthenticated': boolean    
}

const initialState:AuthState = {    
    'tryedToLogin': false,
    'isAuthenticated': false
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
            default:
            return state;
        }
}