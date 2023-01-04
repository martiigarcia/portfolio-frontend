import {Component} from '@angular/core';
import {Proyect} from "../../../domain/Proyect";
import {Router} from "@angular/router";
import {UserServiceService} from "../../../services/UserService/user-service.service";

@Component({
  selector: 'app-proyect-section',
  templateUrl: './proyect-section.component.html',
  styleUrls: ['./proyect-section.component.css']
})
export class ProyectSectionComponent {

  proyects: Proyect[] = [];

  constructor(public router: Router,
              private userServiceService: UserServiceService) {
  }

  ngOnInit(): void {
    this.findProyectsByUser(1);
  }

  findProyectsByUser(id: number) {
    this.userServiceService.findProyectsByUser(id).subscribe(proyects => {
      console.log(proyects);
      this.proyects = proyects;
    })
  }

}
