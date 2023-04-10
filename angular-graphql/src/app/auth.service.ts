import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = 'https://graphql-backend1.herokuapp.com';
  private tokenEndpoint = '/oauth/token';

  constructor(private http: HttpClient, private router: Router) {
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('client:secret')
    });
    const query = `?grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    return this.http.post<any>(this.baseURL + this.tokenEndpoint + query, null, {headers: headers});
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }

  getToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

}
