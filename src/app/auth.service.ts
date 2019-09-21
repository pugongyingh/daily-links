import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  public url = '/.netlify/functions';

  constructor(private readonly http: HttpClient) {}

  public get getToken() {
    return this.token;
  }

  public isAuthenticated() {
    const userData = localStorage.getItem('user');
    if (userData) {
      return true;
    }

    return false;
  }

  public login(username: string, password: string) {
    return this.http
      .post<{ token: string }>(`${this.url}/login`, {
        username,
        password,
      })
      .pipe(
        map(res => {
          this.token = res.token;

          console.log(jwtDecode(res.token));
          localStorage.setItem('user', JSON.stringify(jwtDecode(res.token)));

          return this.token;
        }),
      );
  }

  public logout() {
    this.token = null;
    localStorage.removeItem('user');
  }
}
