import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectSectionRoutingModule } from './proyect-section-routing.module';
import {MaterialModule} from "../material/material.module";
import { ProyectSectionComponent } from './proyect-section/proyect-section.component';


@NgModule({
  declarations: [
    ProyectSectionComponent
  ],
  exports: [
    ProyectSectionComponent
  ],
  imports: [
    CommonModule,
    ProyectSectionRoutingModule,
    MaterialModule
  ]
})
export class ProyectSectionModule { }
