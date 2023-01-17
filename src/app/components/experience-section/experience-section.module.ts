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
import {AddSkillDialog, DialogContentExampleDialog} from "../skills/skills/skills.component";
import {FormsModule} from "@angular/forms";


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
  entryComponents:[AddWorkExperienceDialog, UpdateWorkExperienceDialog, DeleteWorkExperienceDialog]
})
export class ExperienceSectionModule { }
