import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationSectionRoutingModule } from './education-section-routing.module';
import {MaterialModule} from "../material/material.module";
import {
  AddAcademicExperienceDialog, DeleteAcademicExperienceDialog,
  EducationSectionComponent,
  UpdateAcademicExperienceDialog
} from './education-section/education-section.component';
import {FormsModule} from "@angular/forms";
import {ServiceService} from "../../services/Service/service.service";


@NgModule({
  declarations: [
    EducationSectionComponent,
    AddAcademicExperienceDialog,
    UpdateAcademicExperienceDialog,
    DeleteAcademicExperienceDialog
  ],
  exports: [
    EducationSectionComponent
  ],
  imports: [
    CommonModule,
    EducationSectionRoutingModule,
    MaterialModule,
    FormsModule
  ],
  providers: [ServiceService],
  entryComponents:[AddAcademicExperienceDialog, UpdateAcademicExperienceDialog, DeleteAcademicExperienceDialog]
})
export class EducationSectionModule { }
