import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import {LayoutModule} from "../layout/layout.module";
import {BannerModule} from "../banner/banner.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
    BannerModule
  ]
})
export class HomeModule { }
