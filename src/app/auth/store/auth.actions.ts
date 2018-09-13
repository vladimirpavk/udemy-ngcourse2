import { Action } from "@ngrx/store";

export const START_LOADING:string = 'START_LOADING';
export const STOP_LOADING:string = 'STOP_LOADING';
export const USER_AUTHENTICATED :string = 'USER_AUTHENTICATED';
export const USER_NOT_AUTHENTICATED:string = 'USER_NOT_AUTHENTICATED';

export class StartLoading implements Action{
    public readonly type:string = START_LOADING;
}

export class StopLoading implements Action{
    public readonly type:string = STOP_LOADING;
}
export class UserAuthenticated{
    public readonly type:string = USER_AUTHENTICATED;
}

export class UserNotAuthenticated{
    public readonly type:string = USER_NOT_AUTHENTICATED;
}

export type AuthActions = StartLoading | StopLoading;