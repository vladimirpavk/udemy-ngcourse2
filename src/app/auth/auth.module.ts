import { NgModule } from "@angular/core";
import { StoreModule, ActionReducerMap } from '@ngrx/store';

import { AuthRoutingModule } from './auth-routing.module';
import * as fromAuthReducer from './store/auth.reducer';

import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { SharedModule } from "../shared/shared.modules";

@NgModule({
    declarations:[
        LoginComponent,
        SignupComponent
    ],
    imports: [
        StoreModule.forFeature('authState', fromAuthReducer.reducer),
        SharedModule,
        AuthRoutingModule
    ],
    exports:[
        AuthRoutingModule
    ]
})
export class AuthModule{}