import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  logged = false;
  loading = false;

  constructor(public router: Router) {
  }

  ngOnInit(): void {
    this.loading = false;
  }

  login() {
    this.logged = !this.logged;
    // console.log(this.logged)
    this.loading = !this.loading;
    this.router.navigate(['login']);
  }

  logout() {
    this.logged = !this.logged;
    // console.log(this.logged)
    this.loading = !this.loading;
    this.router.navigate(['login']);
  }

}
