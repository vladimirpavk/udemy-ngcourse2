import { Injectable } from "@angular/core";
import { of, from, Observable, ObservableInput } from 'rxjs';
import { map, switchMap, catchError } from "rxjs/operators";
import { Action, Store } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { AngularFireAuth } from 'angularfire2/auth';

import { AppState } from "../../store/app.reducer";
import * as fromAuthActions from './auth.actions';
import * as fromAuthState from './auth.reducer';
import * as fromUIActions from '../../store/ui/ui.actions';

@Injectable()
export class AuthEffects{
    constructor(
        private actions:Actions,
        private store:Store<AppState>,        
        private afAuth:AngularFireAuth
    ){}   
   
        @Effect() public loginEffect:Observable<fromAuthActions.AuthActions> =
        this.actions.pipe(
            ofType(fromAuthActions.LOGIN_USER),
            switchMap(
                (loginUser:fromAuthActions.LoginUser):Observable<fromAuthActions.AuthActions>=>{
                    //ui state
                    this.store.dispatch(new fromUIActions.StartLoading());
                    return from(this.afAuth.auth.signInWithEmailAndPassword(loginUser.email, loginUser.password))
                    .pipe(
                        switchMap(                            
                            (user:any)=>{
                                //user successfully logged in
                                //ui state
                                this.store.dispatch(new fromUIActions.StopLoading());

                                return [
                                    new fromAuthActions.TryedToLogin(),
                                    new fromAuthActions.UserAuthenticated()
                                ];
                            }
                        ),
                        catchError(
                            (err:any)=>{
                                //user logged in failed
                                this.store.dispatch(new fromUIActions.StopLoading());

                                return of(new fromAuthActions.TryedToLogin());
                            }
                        )
                    )
                }
            )
        );
}
