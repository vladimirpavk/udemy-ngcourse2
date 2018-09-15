import * as UIActions from './ui.actions';

export interface UIState{
    'isLoading': boolean
}

export const initialState:UIState={
    'isLoading': false
}

export function reducer(state:UIState=initialState, 
    action:UIActions.UIActions):UIState{

        switch(action.type){
            case(UIActions.START_LOADING):{            
                return {...state, isLoading:true};
            }
            case(UIActions.STOP_LOADING):{
                return {...state, isLoading:false};
            }           
            default:
            return state;
        }        
}

