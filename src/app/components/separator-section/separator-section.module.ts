import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeparatorSectionRoutingModule } from './separator-section-routing.module';
import { SeparatorSectionComponent } from './separator-section/separator-section.component';


@NgModule({
  declarations: [
    SeparatorSectionComponent
  ],
  exports: [
    SeparatorSectionComponent
  ],
  imports: [
    CommonModule,
    SeparatorSectionRoutingModule
  ]
})
export class SeparatorSectionModule { }
