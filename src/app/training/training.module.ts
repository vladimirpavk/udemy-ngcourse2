import { NgModule } from "@angular/core";
import { StoreModule } from '@ngrx/store';

import * as fromTrainingReducer from './store/training.reducer';

import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { TrainingComponent } from "./training.component";
import { CancelTrainingComponent } from "./current-training/cancel-training/cancel-training.component";

import { SharedModule } from "../shared/shared.modules";
import { TrainingRoutingModule } from "./training-routing.module";

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        CancelTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent       
    ],
    imports:[
        StoreModule.forFeature('trainingState', fromTrainingReducer.reducer),
        SharedModule,
        TrainingRoutingModule
    ],
    entryComponents: [
      CancelTrainingComponent
    ]
})
export class TrainingModule{
}