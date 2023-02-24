import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/Auth/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  logged = false;
  loading = false;

  constructor(public authService: AuthService,
              private afAuth: AngularFireAuth,
              public router: Router) {
  }

  ngOnInit(): void {
    this.loading = false;
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.logged=true;
      } else {
        this.logged=false;
      }
    }).then(r => console.log(r));
  }

  login() {
    this.logged = !this.logged;
    this.loading = !this.loading;
    this.router.navigate(['login']);
  }

  logout() {
    this.authService.logout().then(resp =>{
      this.logged = !this.logged;
      this.loading = !this.loading;
      this.router.navigate(['login']);
    });
  }

}
