import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Variables
  authUrl = 'http://localhost:8000/login';
  apiUrl = 'http://localhost:8000/api';
  options: any;
  /**
   * Constructor
   * @param http The http client object
   */
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
  }

  
  login(email: string, password: string) {
    return this.http.post(this.authUrl, {
      email: email,
      password: password,
    });
  }

  /**
   * Revoke the authenticated user token
   */
  logout(allDevice: boolean) {

    const user:any = localStorage.getItem('access_token');
    const userObj = JSON.parse(user);
    const token = userObj.token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post('http://localhost:8000/api/logout', {allDevice: allDevice}, {headers: headers});


    // this.options.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token');
    // return this.http.get(this.apiUrl + '/token/revoke', this.options);
  }

}
