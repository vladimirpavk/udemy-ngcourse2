import { Injectable } from "@angular/core";
import { of, from, Observable, ObservableInput } from 'rxjs';
import { map, switchMap, catchError } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { AngularFireAuth } from 'angularfire2/auth';

import { AppState } from "../../store/app.reducer";
import * as fromAuthActions from './auth.actions';
import * as fromAuthState from './auth.reducer';

@Injectable()
export class AuthEffects{
    constructor(
        private actions:Actions,
        private store:Store<AppState>,        
        private afAuth:AngularFireAuth
    ){}

    @Effect() public loginEffect =
        this.actions.pipe(
            ofType(fromAuthActions.LOGIN_USER),
            switchMap(
                (loginUser:fromAuthActions.LoginUser):ObservableInput<{}>=>{
                    console.log(loginUser);
                    return from(
                        this.afAuth.auth.signInWithEmailAndPassword(loginUser.email, loginUser.password)
                    ).pipe(
                        map(
                            ()=>{
                                //user successfully logged in
                                return [
                                    new fromAuthActions.TryedToLogin(),
                                    new fromAuthActions.UserAuthenticated()
                                ];
                            }
                        ),
                        catchError(
                            (err:any)=>{
                                //user logged in failed
                                return of(new fromAuthActions.TryedToLogin());
                            }
                        )
                    )
                }
            )
        );
}
