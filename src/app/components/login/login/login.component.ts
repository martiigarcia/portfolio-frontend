import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });


  constructor(public fb: FormBuilder,
              public router: Router,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  get fc() {
    return this.loginForm.controls;
  }

  logIn() {
    this.router.navigate(['']);
  }

}


