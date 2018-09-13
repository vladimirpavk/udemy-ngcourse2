import * as AuthActions from "./auth.actions";


export interface AuthState{
    'isLoading': boolean,
    'isAuthenticated': boolean    
}

const initialState:AuthState = {
    'isLoading': false,
    'isAuthenticated':false
}

export function reducer(state:AuthState=initialState, 
    action:AuthActions.AuthActions):AuthState{

        switch(action.type){
            case(AuthActions.START_LOADING):{            
                return {...state, isLoading:true};
            }
            case(AuthActions.STOP_LOADING):{
                return {...state, isLoading:false};
            }
            case(AuthActions.USER_AUTHENTICATED):{
                return {...state, isAuthenticated:true}
            }
            case(AuthActions.USER_NOT_AUTHENTICATED):{
                return {...state, isAuthenticated:false}
            }
        }

}