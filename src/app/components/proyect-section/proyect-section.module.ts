import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectSectionRoutingModule } from './proyect-section-routing.module';
import {MaterialModule} from "../material/material.module";
import {
  AddProyectDialog, DeleteProyectDialog,
  ProyectSectionComponent,
  UpdateProyctDialog
} from './proyect-section/proyect-section.component';
import {FormsModule} from "@angular/forms";
import {ServiceService} from "../../services/Service/service.service";


@NgModule({
  declarations: [
    ProyectSectionComponent,
    AddProyectDialog,
    UpdateProyctDialog,
    DeleteProyectDialog
  ],
  exports: [
    ProyectSectionComponent
  ],
  imports: [
    CommonModule,
    ProyectSectionRoutingModule,
    MaterialModule,
    FormsModule
  ],
  providers: [ServiceService],
  entryComponents:[AddProyectDialog, UpdateProyctDialog, DeleteProyectDialog],
})
export class ProyectSectionModule { }
