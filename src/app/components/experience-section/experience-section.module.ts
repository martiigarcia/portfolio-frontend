import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperienceSectionRoutingModule } from './experience-section-routing.module';
import {
  AddWorkExperienceDialog, DeleteWorkExperienceDialog,
  ExperienceSectionComponent,
  UpdateWorkExperienceDialog
} from './experience-section/experience-section.component';
import {MaterialModule} from "../material/material.module";
import {SeparatorSectionModule} from "../separator-section/separator-section.module";
import {FormsModule} from "@angular/forms";
import {ServiceService} from "../../services/Service/service.service";


@NgModule({
  declarations: [
    ExperienceSectionComponent,
    AddWorkExperienceDialog,
    UpdateWorkExperienceDialog,
    DeleteWorkExperienceDialog,
  ],
  exports: [
    ExperienceSectionComponent
  ],
  imports: [
    CommonModule,
    ExperienceSectionRoutingModule,
    MaterialModule,
    FormsModule
  ],
  providers: [ServiceService],
  entryComponents:[AddWorkExperienceDialog, UpdateWorkExperienceDialog, DeleteWorkExperienceDialog]
})
export class ExperienceSectionModule { }
