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

    const token = userObj.token;

    this.user = userObj;
    //console.log(userObj);

  }

  /**
   * Logout the user and revoke his token
   */
  logout(): void {

    //console.log(this.checkbox);

    this.authService.logout(this.checkbox).subscribe((res) => {
      console.log(res);
      localStorage.removeItem('access_token');
      this.router.navigate(['/login']);
    }, (err) => {
      console.log(err);
    })

    // this.loading = true;
    // this.authService.logout()
    //   .subscribe(() => {
    //     this.loading = false;
    //     localStorage.removeItem('access_token');
    //     this.router.navigate(['/login']);
    //   });
  }

}
