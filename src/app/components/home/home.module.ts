import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import {LayoutModule} from "../layout/layout.module";
import {BannerModule} from "../banner/banner.module";
import {MyDataModule} from "../my-data/my-data.module";
import {ExperienceSectionModule} from "../experience-section/experience-section.module";
import {EducationSectionModule} from "../education-section/education-section.module";
import {SeparatorSectionModule} from "../separator-section/separator-section.module";
import {SkillsModule} from "../skills/skills.module";
import {ProyectSectionModule} from "../proyect-section/proyect-section.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
    BannerModule,
    MyDataModule,
    ExperienceSectionModule,
    SeparatorSectionModule,
    EducationSectionModule,
    SkillsModule,
    ProyectSectionModule
  ]
})
export class HomeModule { }
