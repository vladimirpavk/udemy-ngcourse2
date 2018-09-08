import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material.module";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { TrainingComponent } from "./training.component";
import { CancelTrainingComponent } from "./current-training/cancel-training/cancel-training.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        CancelTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent       
    ],
    imports:[
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule
    ]
})
export class TrainingModule{
}