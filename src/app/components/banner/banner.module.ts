import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerRoutingModule } from './banner-routing.module';
import { BannerComponent } from './banner/banner.component';
import {MaterialModule} from "../material/material.module";


@NgModule({
  declarations: [
    BannerComponent
  ],
  exports: [
    BannerComponent
  ],
  imports: [
    CommonModule,
    BannerRoutingModule,
    MaterialModule
  ]
})
export class BannerModule { }
