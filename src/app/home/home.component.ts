import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Variables
  accessToken: any;
  loading: boolean = false;
  checkbox: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.accessToken = localStorage.getItem('access_token');
  }

  user:any;
  ngOnInit(): void {
    const user:any = localStorage.getItem('access_token');
    const userObj = JSON.parse(user);
    console.log(userObj);
    this.user = userObj;
    
    // const token = userObj.token;
  }

  /**
   * Logout the user and revoke his token
   */
  logout(): void {
    this.authService.logout(this.checkbox)
    .subscribe({
      next: (response) => {
        console.log(response);
        localStorage.removeItem('access_token');

        // this.authService.toggleLogin(false);
        // https://github.com/subhadipghorui/laravel-angular-api-authentication-full
        // https://www.youtube.com/watch?v=Ad3lPnEN0fY&list=PL397yT3D1n9ipqiMZug6mdPIczG2fmfjK&index=5&ab_channel=myiotlab

        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

}
