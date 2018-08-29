import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';


import { WelcomeComponent } from "./welcome/welcome.component";
import { LoginComponent } from "./auth/login/login.component";
import { TrainingComponent } from "./training/training.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from './auth/auth.guard';

const routes:Routes = [
    { path: '', component:WelcomeComponent },
    { path: 'login', component:LoginComponent },
    { path: 'training', component:TrainingComponent, canActivate:[AuthGuard] },
    { path: 'signup', component:SignupComponent },
    { path: '**', redirectTo: ''}
];

@NgModule({
    providers: [AuthGuard],
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{

}