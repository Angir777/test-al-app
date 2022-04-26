import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../shared/services/auth/auth.service';
import { EventManagerService } from '../shared/services/event-manager/event-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Variables
  user:any;
  accessToken: any;
  loading: boolean = false;
  checkbox: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private eventManager: EventManagerService,
  ) {
    this.accessToken = localStorage.getItem('user_info');
  }

  ngOnInit(): void {
    const user:any = localStorage.getItem('user_info');
    const userObj = JSON.parse(user);
    // console.log(userObj);
    this.user = userObj;
  }

  /**
   * Logout - tutaj działa za pomocą serwisu
   */
  logout(): void {
    this.authService.logout(this.checkbox)
    .pipe(
      finalize(() => {
        localStorage.removeItem('user_info');
      })
    )
    .subscribe({
      next: (response) => {
        // https://github.com/subhadipghorui/laravel-angular-api-authentication-full
        // https://www.youtube.com/watch?v=Ad3lPnEN0fY&list=PL397yT3D1n9ipqiMZug6mdPIczG2fmfjK&index=5&ab_channel=myiotlab
        // login status event
        this.eventManager.broadcastEvent({
          name: 'ON_AUTH_CHANGED',
          content: {
            isLogin: false,
          }
        })
        // redirect
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

}
