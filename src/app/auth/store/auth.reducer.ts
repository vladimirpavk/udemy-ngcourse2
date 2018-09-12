import { AuthActions, START_LOADING, STOP_LOADING } from "./auth.actions";


export interface AuthState{
    'isLoading': boolean,
    'isAuthenticated': boolean    
}

const initialState:AuthState = {
    'isLoading': false,
    'isAuthenticated':false
}

export function reducer(state:AuthState=initialState, action:AuthActions):AuthState{
    switch(action.type){
        case(START_LOADING):{            
            return {...state, isLoading:true};
        }
        case(STOP_LOADING):{
            return {...state, isLoading:false};
        }
    }
}