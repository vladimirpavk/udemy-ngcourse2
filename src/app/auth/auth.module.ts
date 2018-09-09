import { NgModule } from "@angular/core";
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { SharedModule } from "../shared/shared.modules";

@NgModule({
    declarations:[
        LoginComponent,
        SignupComponent
    ],
    imports: [
       SharedModule,
       AuthRoutingModule
    ],
    exports:[
        AuthRoutingModule
    ]
})
export class AuthModule{}