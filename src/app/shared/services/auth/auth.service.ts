import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPost } from 'src/app/post/post';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Variables
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  /**
   * Constructor
   * @param http The http client object
   */
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {

  }

  get token(): any {
    return JSON.parse(localStorage.getItem('user_info') || '')?.body.token;
  }

  get isAuthenticated(): boolean {
    const userInfo: any = localStorage.getItem('user_info');
    if(!userInfo){
      return false;
    }
    return true
  }

  // sprawdza czy user jest zalogowany i zwraca true / false, inne podejście bo mam jeszcze jedno w tym projekcie z AuthGuardService
  // to dobre jak podstrona ma być dostępna, ale jakaś funkcjonalność ma być zablokowana
  // status() {
  //   const localData: any = localStorage.getItem('user_info');
  //   if(!localData){
  //     this.isLoggedIn.next(false);
  //     console.log("User not logged in!");
  //   }
  //   const userObj = JSON.parse(localData);
  //   const token_expires_at = new Date(userObj.token_expires_at);
  //   const current_date = new Date();
  //   if(token_expires_at > current_date){
  //     this.isLoggedIn.next(true);
  //   }else{
  //     this.isLoggedIn.next(false);
  //     console.log("Token Exires");
  //   }
  //   return this.isLoggedIn.asObservable();
  // }

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
