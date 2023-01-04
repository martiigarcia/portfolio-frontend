import { Component } from '@angular/core';
import {Experience} from "../../../domain/Experience";
import {Router} from "@angular/router";
import {UserServiceService} from "../../../services/UserService/user-service.service";

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.css']
})
export class ExperienceSectionComponent {

  experiences : Experience[] = [];

  constructor(public router: Router,
              private userServiceService: UserServiceService) {
  }
  ngOnInit(): void {
    this.getExperiencesByUser(1);
  }

  getExperiencesByUser(id:number){
    this.userServiceService.findExperienceByUser(id).subscribe(experience =>{
      console.log(experience)
      this.experiences = experience;
    })
  }

}
