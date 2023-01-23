import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SkillsRoutingModule} from './skills-routing.module';
import {MaterialModule} from "../material/material.module";
import {
  AddSkillDialog,
  DeleteSkillDialog,
  SkillsComponent, UpdateSkillDialog
} from './skills/skills.component';
import {FormsModule} from "@angular/forms";
import {ServiceService} from "../../services/Service/service.service";


@NgModule({
  declarations: [
    SkillsComponent,
    AddSkillDialog,
    DeleteSkillDialog,
    UpdateSkillDialog
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
  providers: [ServiceService],
  entryComponents: [AddSkillDialog, UpdateSkillDialog, DeleteSkillDialog]
})
export class SkillsModule {
}
