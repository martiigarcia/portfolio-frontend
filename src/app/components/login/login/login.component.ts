import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../services/Auth/auth.service";

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
              public authService: AuthService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  get fc() {
    return this.loginForm.controls;
  }

  logIn() {
    this.authService.login(this.loginForm.get(['email'])?.value, this.loginForm.get(['password'])?.value)
      .then(resp => {
          console.log(resp)
          this.router.navigate([''])
        }
      ).catch(error =>{
        console.log(error)
    });
  }
  logInWithGoogle() {
    this.authService.loginWithGoogle()
      .then(resp => {
          console.log(resp)
          this.router.navigate([''])
        }
      ).catch(error =>{
      console.log(error)
    });
  }

}


