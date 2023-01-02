import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "./components/material/material.module";
import {LayoutModule} from "./components/layout/layout.module";
import {HomeModule} from "./components/home/home.module";
import {MyDataModule} from "./components/my-data/my-data.module";
import {ExperienceSectionModule} from "./components/experience-section/experience-section.module";
import {SeparatorSectionModule} from "./components/separator-section/separator-section.module";
import {EducationSectionModule} from "./components/education-section/education-section.module";
import {SkillsModule} from "./components/skills/skills.module";
import {ProyectSectionModule} from "./components/proyect-section/proyect-section.module";
import {LoginModule} from "./components/login/login.module";

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    LayoutModule,
    HomeModule,
    MyDataModule,
    ExperienceSectionModule,
    SeparatorSectionModule,
    EducationSectionModule,
    SkillsModule,
    ProyectSectionModule,
    LoginModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
