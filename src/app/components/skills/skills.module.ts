import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillsRoutingModule } from './skills-routing.module';
import {MaterialModule} from "../material/material.module";
import {AddSkillDialog, DialogContentExampleDialog, SkillsComponent} from './skills/skills.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SkillsComponent,
    DialogContentExampleDialog,
    AddSkillDialog,
  ],
  exports: [
    SkillsComponent
  ],
  imports: [
    CommonModule,
    SkillsRoutingModule,
    MaterialModule,
    FormsModule
  ],
  entryComponents:[DialogContentExampleDialog, AddSkillDialog]
})
export class SkillsModule { }
