import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { TrainingService } from '../training/training.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromAuthActions from './store/auth.actions';
import * as fromUIActions from '../store/ui/ui.actions';

@Injectable()
export class AuthService{    
    public authChanged:Subject<boolean> = new Subject<boolean>();    

    constructor(
        private router:Router,
        private afAuth:AngularFireAuth,
        private trainingService:TrainingService,
        private snackbar:MatSnackBar,
        private store:Store<fromApp.AppState>
    ){}

    public initAfAuth(){
        this.afAuth.authState.subscribe(
            (result)=>{
                if(result){
                    //login successfull || signup successfull
                    this.store.dispatch(new fromUIActions.StopLoading());
                    this.store.dispatch(new fromAuthActions.UserAuthenticated());                                                         

                    this.router.navigate(['/training']);
                }
                else{
                    this.trainingService.cancelSubs();
                    this.afAuth.auth.signOut();

                    this.store.dispatch(new fromUIActions.StopLoading());
                    this.store.dispatch(new fromAuthActions.UserNotAuthenticated());
                   
                    this.router.navigate(['/login']);
                }                               
            }
        );
    }

    public registerUser(authData: AuthData):void{        
        this.store.dispatch(new fromUIActions.StartLoading());  
        
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .catch(
                (error)=>{
                    this.snackbar.open(error.message, null, {
                        duration:2000
                    });
                                        
                    this.store.dispatch(new fromUIActions.StopLoading());
                    this.store.dispatch(new fromAuthActions.UserNotAuthenticated());

                    this.authChanged.next(false);
                }                
            );
    }

    public login(authData: AuthData):void{
        this.store.dispatch(new fromUIActions.StartLoading());  
       
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .catch(
                (error)=>{
                    this.snackbar.open(error.message, null, {
                        duration:2000
                    });     
                    
                    this.store.dispatch(new fromUIActions.StopLoading());
                    this.store.dispatch(new fromAuthActions.UserNotAuthenticated());

                    this.authChanged.next(false);
                }                
            );
    }

    public logout():void{     
        console.log(this.afAuth.auth.signOut());        
    }    

}