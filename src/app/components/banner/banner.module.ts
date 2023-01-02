import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerRoutingModule } from './banner-routing.module';
import { BannerComponent } from './banner/banner.component';
import {MaterialModule} from "../material/material.module";
import {MyDataModule} from "../my-data/my-data.module";


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
    MaterialModule,
    MyDataModule
  ]
})
export class BannerModule { }
