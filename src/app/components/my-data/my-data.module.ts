import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyDataRoutingModule } from './my-data-routing.module';
import { MyDataComponent } from './my-data/my-data.component';
import {MaterialModule} from "../material/material.module";
import {ServiceService} from "../../services/Service/service.service";


@NgModule({
  declarations: [
    MyDataComponent
  ],
  exports: [
    MyDataComponent
  ],
  imports: [
    CommonModule,
    MyDataRoutingModule,
    MaterialModule
  ],
  providers: [ServiceService],
})
export class MyDataModule { }
