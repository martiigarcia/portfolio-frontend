import {Component, HostListener} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {Router} from "@angular/router";
import {UserServiceService} from "../../../services/UserService/user-service.service";
import {Skill} from "../../../domain/Skill";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {

  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'determinate';
  // value = 75;



  skills: Skill[] = [];

  constructor(public router: Router,
              private userServiceService: UserServiceService) {
  }

  ngOnInit(): void {
    this.findSkillsByUser(1);
    console.log(this.skills)
  }

  findSkillsByUser(id: number) {
    this.userServiceService.findSkillsByUser(id).subscribe(skillsX => {
      console.log(skillsX);
      this.skills = skillsX;
    })
  }

  showSpinner = false;

  @HostListener('window:scroll', [])
  onScroll() {
    // Show the spinner when the user scrolls down
    this.showSpinner = true;
  }
}
