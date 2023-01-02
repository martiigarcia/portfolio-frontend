import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationSectionRoutingModule } from './education-section-routing.module';
import {MaterialModule} from "../material/material.module";
import {SeparatorSectionModule} from "../separator-section/separator-section.module";
import { EducationSectionComponent } from './education-section/education-section.component';


@NgModule({
  declarations: [
    EducationSectionComponent
  ],
  exports: [
    EducationSectionComponent
  ],
  imports: [
    CommonModule,
    EducationSectionRoutingModule,
    MaterialModule
  ]
})
export class EducationSectionModule { }
