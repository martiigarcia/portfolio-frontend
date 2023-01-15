import { Component } from '@angular/core';
import {WorkExperience} from "../../../domain/WorkExperience";
import {Router} from "@angular/router";
import {UserServiceService} from "../../../services/UserService/user-service.service";

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.css']
})
export class ExperienceSectionComponent {
  logged: boolean = true;
  editMode: boolean = false;
  experiences : WorkExperience[] = [];

  constructor(public router: Router,
              private userServiceService: UserServiceService) {
  }
  ngOnInit(): void {
    this.getExperiencesByUser(1);
  }

  getExperiencesByUser(id:number){
    this.userServiceService.findWorkExperienceByUser(id).subscribe(experience =>{
      // console.log(experience)
      this.experiences = experience;
    })
  }
  edit() {
    this.editMode = !this.editMode;
  }

  add() {
    alert("AGREGAR")
  }

  delete(){

  }
  editExperience(){

  }

}
