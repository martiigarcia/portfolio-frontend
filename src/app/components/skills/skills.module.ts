import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillsRoutingModule } from './skills-routing.module';
import {MaterialModule} from "../material/material.module";
import { SkillsComponent } from './skills/skills.component';


@NgModule({
  declarations: [
    SkillsComponent
  ],
  exports: [
    SkillsComponent
  ],
  imports: [
    CommonModule,
    SkillsRoutingModule,
    MaterialModule
  ]
})
export class SkillsModule { }
