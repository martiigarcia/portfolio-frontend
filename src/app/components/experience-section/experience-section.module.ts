import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperienceSectionRoutingModule } from './experience-section-routing.module';
import { ExperienceSectionComponent } from './experience-section/experience-section.component';
import {MaterialModule} from "../material/material.module";
import {SeparatorSectionModule} from "../separator-section/separator-section.module";


@NgModule({
  declarations: [
    ExperienceSectionComponent
  ],
  exports: [
    ExperienceSectionComponent
  ],
  imports: [
    CommonModule,
    ExperienceSectionRoutingModule,
    MaterialModule
  ]
})
export class ExperienceSectionModule { }
