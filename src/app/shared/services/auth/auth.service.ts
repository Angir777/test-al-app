import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Constructor
   * @param http The http client object
   */
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  // Get token
  get token(): any {
    return JSON.parse(localStorage.getItem('user_info') || '')?.body.token;
  }

  // Get info aout if user is logged
  get isAuthenticated(): boolean {
    const userInfo: any = localStorage.getItem('user_info');
    if(!userInfo){
      return false;
    }
    return true
  }

  /**
   * Logowanie - nie działa tutaj poprzez serwis
   */
  login(email: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post('http://localhost:8000/api/login', {
      email: email,
      password: password
    },
    {
      observe: 'response',
    });
  }

  /**
   * Revoke the authenticated user token
   */
  logout(allDevice: boolean): Observable<HttpResponse<any>> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post('http://localhost:8000/api/logout',
    {
      allDevice: allDevice
    }, 
    {
      headers,
      observe: 'response',
    });
  }

}
