import { NgModule } from "@angular/core";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { TrainingComponent } from "./training.component";
import { CancelTrainingComponent } from "./current-training/cancel-training/cancel-training.component";

import { SharedModule } from "../shared/shared.modules";

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        CancelTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent       
    ],
    imports:[
        SharedModule
    ],
    entryComponents: [
      CancelTrainingComponent
    ]
})
export class TrainingModule{
}