import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthService{
    private user:User;
    public authChanged : Subject<boolean> = new Subject<boolean>();

    constructor(private router:Router){}

    public registerUser(authData: AuthData):void{
        this.user={
            email: authData.email,
            userId: (Math.random()*10000).toString()
        }       
        this.authChanged.next(true);
        this.router.navigate(['/training']);
    }

    public login(authData: AuthData):void{
        this.user={
            email: authData.email,
            userId: (Math.random()*10000).toString()
        }
        this.authChanged.next(true);
        this.router.navigate(['/training']);
    }

    public logout():void{
        this.user=null;
        this.authChanged.next(false);
        this.router.navigate(['/login']);
    }

    public getUser():User{
        console.log( { ...this.user } );
        return { ...this.user };
    }

    public isAuth():boolean{        
        return this.user!=null;
    }

}