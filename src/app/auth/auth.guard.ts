import { Injectable } from "@angular/core";
import { 
    CanActivate, 
    CanLoad,
    Route,
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    Router
} from "@angular/router";

import { AuthService } from "./auth.service";

import { Store } from '@ngrx/store';
import { AuthState } from './store/auth.reducer';
import * as fromApp from '../store/app.reducer';

import { Observable } from "rxjs";
import { map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad{

    constructor(
        private authService:AuthService,
        private router:Router,
        private store:Store<fromApp.AppState>
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean | Observable<boolean>{           
        return this.store.select('authState').pipe(
            map(res=>{
                console.log("+");
                console.log(res);
                if(!res.isAuthenticated) this.router.navigate(['/login']);
                return res.isAuthenticated;
            }), take(1)
        );
        /*if(this.authService.isAuth()){            
            return true;
        }
        else
        {            
            this.router.navigate(['/login']);
            return false;           
        }*/
    }

    canLoad(route: Route):boolean | Observable<boolean>{        
        return this.store.select('authState').pipe(
            map(res=>{
                console.log(res);
                if(!res.isAuthenticated) this.router.navigate(['/login']);
                return res.isAuthenticated;
            }),
            take(1)
        );
    }
}