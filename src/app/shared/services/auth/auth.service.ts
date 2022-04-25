import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Variables
  authUrl = 'http://localhost:8000/login';
  apiUrl = 'http://localhost:8000/api';
  options: any;

  private isLoggedIn = new BehaviorSubject<boolean>(false);

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

  toggleLogin(state: boolean): void {
    this.isLoggedIn.next(state);
  }

  // sprawdza czy user jest zalogowany i zwraca true / false, inne podejście bo mam jeszcze jedno w tym projekcie z AuthGuardService
  // to dobre jak podstrona ma być dostępna, ale jakaś funkcjonalność ma być zablokowana
  status() {
    const localData: any = localStorage.getItem('access_token');
    if(!localData){
      this.isLoggedIn.next(false);
      console.log("User not logged in!");
    }
    const userObj = JSON.parse(localData);
    const token_expires_at = new Date(userObj.token_expires_at);
    const current_date = new Date();
    if(token_expires_at > current_date){
      this.isLoggedIn.next(true);
    }else{
      this.isLoggedIn.next(false);
      console.log("Token Exires");
    }
    return this.isLoggedIn.asObservable();
  }

  /**
   * Logowanie - nie działa poprzez serwis
   * @param email 
   * @param password 
   * @returns 
   */
  login(email: string, password: string) {
    return this.http.post('http://localhost:8000/api/login', {
      email: email,
      password: password
    });
  }

  /**
   * Revoke the authenticated user token
   */
  logout(allDevice: boolean) {

    const user: any = localStorage.getItem('access_token');
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
