import * as AuthActions from "./auth.actions";


export interface AuthState{    
    'isAuthenticated': boolean    
}

const initialState:AuthState = {    
    'isAuthenticated':false
}

export function reducer(state:AuthState=initialState, 
    action:AuthActions.AuthActions):AuthState{

        switch(action.type){           
            case(AuthActions.USER_AUTHENTICATED):{
                return {...state, isAuthenticated:true}
            }
            case(AuthActions.USER_NOT_AUTHENTICATED):{
                return {...state, isAuthenticated:false}
            }
            default:
            return state;
        }

}