import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(username: string, password: string): void {
    this.authService.login(username, password).subscribe(
      data => {
        localStorage.setItem("access_token", data.access_token)
        this.router.navigate(['/employees']);
      },
      error => {
        this.errorMessage = 'Invalid credentials';
      }
    );
  }

}
