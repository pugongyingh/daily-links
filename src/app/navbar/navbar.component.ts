import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
  public showLoginModal = false;
  public showSignupModal = false;
  public authenticated = false;

  constructor(readonly auth: AuthService) {
    this.authenticated = this.auth.isAuthenticated();
  }

  ngOnInit() {}

  public signup(username: string, password: string) {
    this.auth.signup(username, password).subscribe(
      () => {
        this.showSignupModal = false;
      },
      error => {
        console.error('Error signing up');
      },
    );
  }

  public login(username: string, password: string) {
    this.auth.login(username, password).subscribe(
      () => {
        this.showLoginModal = false;
        this.authenticated = this.auth.isAuthenticated();
      },
      error => {
        console.error('Error logging in');
      },
    );
  }

  public logout() {
    this.auth.logout();
    this.authenticated = this.auth.isAuthenticated();
  }
}
