import {Component} from '@angular/core';
import {UserServiceService} from "../../../services/UserService/user-service.service";
import {Router} from "@angular/router";
import {User} from "../../../domain/User";

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.css']
})
export class MyDataComponent {

  users: User[] = [];
  user: any;
  loading: boolean = false;


  ngOnInit(): void {
    this.findOne();
  }

  constructor(public router: Router,
              private userServiceService: UserServiceService) {
  }

  findAll() {
    this.userServiceService.findAll().subscribe(list => {
      console.log(list)
      this.users = list;
      this.loading = false;
    });
  }

  findOne() {
    this.userServiceService.findOne(1).subscribe(user => {
      console.log(user)
      this.user = user;
      if(this.user._admin === true){
        console.log("ES VERDADERO")
      }else{
        console.log("ES FALSO")
      }
    })
  }
}
