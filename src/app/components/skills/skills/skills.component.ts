import { Component } from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {

  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'determinate';
  value = 75;
}
