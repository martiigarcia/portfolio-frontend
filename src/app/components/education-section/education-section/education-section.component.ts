import {Component} from '@angular/core';
import {WorkExperience} from "../../../domain/WorkExperience";
import {Router} from "@angular/router";
import {UserServiceService} from "../../../services/UserService/user-service.service";
import {AcademicExperience} from "../../../domain/AcademicExperience";

@Component({
  selector: 'app-education-section',
  templateUrl: './education-section.component.html',
  styleUrls: ['./education-section.component.css']
})
export class EducationSectionComponent {

  logged: boolean = true;
  editMode: boolean = false;
  experiences: AcademicExperience[] = [];

  constructor(public router: Router,
              private userServiceService: UserServiceService) {
  }

  ngOnInit(): void {
    this.getExperiencesByUser(1);
  }

  getExperiencesByUser(id: number) {
    this.userServiceService.findAcademicExperienceByUser(id).subscribe(experience => {
      // console.log(experience)
      this.experiences = experience;
    })
  }
  edit(){
    this.editMode=!this.editMode;
  }
  add(){

  }
  delete(){

  }
  editExperience(){

  }


}
