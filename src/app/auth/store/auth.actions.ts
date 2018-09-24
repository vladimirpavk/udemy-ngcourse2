import { Action } from "@ngrx/store";

export const LOGIN_USER: string = 'LOGIN_USER';
export const TRYED_TO_LOGIN: string = 'TRYED_TO_LOGIN';
export const NOT_TRYED_TO_LOGIN: string = 'NOT_TRYED_TO_LOGIN';
export const USER_AUTHENTICATED :string = 'USER_AUTHENTICATED';
export const USER_NOT_AUTHENTICATED:string = 'USER_NOT_AUTHENTICATED';

export const SIGNUP_USER: string = 'SIGNUP_USER';
export const SIGNUP_SUCCESS: string = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILED: string = 'SIGNUP_FAILED';

export class LoginUser implements Action{
    public readonly type:string = LOGIN_USER;
    constructor(
        public email:string,
        public password:string
    ){}
}

export class SignupUser implements Action{
    public readonly type:string = SIGNUP_USER;
    constructor(
        public email:string,
        public password:string
    ){}
}

export class TryedToLogin implements Action{
    public readonly type:string = TRYED_TO_LOGIN;    
}

export class NotTryedToLogin implements Action{
    public readonly type:string = NOT_TRYED_TO_LOGIN;    
}

export class UserAuthenticated implements Action{
    public readonly type:string = USER_AUTHENTICATED;
}

export class UserNotAuthenticated implements Action{
    public readonly type:string = USER_NOT_AUTHENTICATED;
}

export class SignupSuccess implements Action{
    public readonly type:string = SIGNUP_SUCCESS;
}

export class SignupFailed implements Action{
    public readonly type:string = SIGNUP_FAILED;
    constructor(public errorMsg:string){}
}

export type AuthActions = LoginUser | 
                          SignupUser |
                          TryedToLogin |
                          NotTryedToLogin |
                          UserAuthenticated |
                          UserNotAuthenticated |
                          SignupSuccess |
                          SignupFailed;