import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserServiceService} from "../../../services/UserService/user-service.service";
import {Router} from "@angular/router";
import {User} from "../../../domain/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.css']
})
export class MyDataComponent implements OnInit {

  user: any;
  loading: boolean = false;
  logged: boolean = true;
  editMode: boolean = false;

  @Input()
  formUser: FormGroup = this.fb.group({
    id: [null, []],
    name: ['', [Validators.required, Validators.minLength(3)]],
    surname: ['', [Validators.required, Validators.minLength(3)]],
    age: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
    email: ['', [Validators.required, Validators.email]],
    information: ['', [Validators.required, Validators.minLength(10)]],
    password: ['', [Validators.required]],
    admin: ['', [Validators.required]]
  });

  constructor(public router: Router, public fb: FormBuilder, private snackBar: MatSnackBar,
              private userServiceService: UserServiceService) {
  }

  ngOnInit(): void {
    this.findOne();
  }


  findOne() {
    this.userServiceService.findOne(1).subscribe(user => {
      this.buildForm(user)
      this.user = user;
    })
  }

  buildForm(user: User | null) {
    if (user != null)
      this.formUser.patchValue({
        id: user.id,
        name: user.name,
        surname: user.surname,
        age: user.age,
        email: user.email,
        information: user.information,
        password: user.password,
        admin: user.admin
      })
  }

  get fc() {
    return this.formUser.controls;
  }

  edit() {
    this.editMode = !this.editMode;
  }

  save() {

    const user = new User(
      this.formUser.get(["id"])?.value,
      this.formUser.get(["name"])?.value,
      this.formUser.get(["surname"])?.value,
      this.formUser.get(["age"])?.value,
      this.formUser.get(["email"])?.value,
      this.formUser.get(["password"])?.value,
      this.formUser.get(["admin"])?.value,
      this.formUser.get(["information"])?.value);

    this.userServiceService.updateMyData(user).subscribe(p => {

        if (user.information === this.user.information) {
          this.snackBar.open("El usuario se actualizó correctamente.", "Éxito", {duration: 2000});
        } else {
          this.userServiceService.updateMyInformation(user.information, user.id).subscribe(p => {
            this.snackBar.open("La information se actualizó correctamente.", "Éxito", {duration: 2000});
            this.ngOnInit();
          })
        }
        this.ngOnInit();
        this.editMode = !this.editMode;
      },
      error => {
        this.snackBar.open(error, "Error", {duration: 2000});
      }
    );
  }


}
