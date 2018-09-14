import { Action } from "@ngrx/store";

export const USER_AUTHENTICATED :string = 'USER_AUTHENTICATED';
export const USER_NOT_AUTHENTICATED:string = 'USER_NOT_AUTHENTICATED';

export class UserAuthenticated{
    public readonly type:string = USER_AUTHENTICATED;
}

export class UserNotAuthenticated{
    public readonly type:string = USER_NOT_AUTHENTICATED;
}

export type AuthActions = UserAuthenticated | UserNotAuthenticated;