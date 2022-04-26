import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, takeLast } from 'rxjs';
import { IPost } from 'src/app/post/post';
import { Post } from '../../models/post';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = "http://localhost:8000/api/posts";

  constructor(
    private http:HttpClient,
    private authService: AuthService
  ) { }

  /**
   * Pobiera wszystkie posty
   * headers - przesyłamy token do api gdzie jest na routingu ->middleware('auth:api')
   * observe - odpowiedź z api
   */
  list():Observable<HttpResponse<IPost[]>> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.http.get<IPost[]>(this.url, {
      headers,
      observe: 'response',
    });
  }

  /**
   * Dodaje nowy post
   */
  add(post:IPost): Observable<HttpResponse<IPost>> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.http.post<IPost>(this.url, post, {
      headers,
      observe: 'response',
    });
  }

  /**
   * Aktualizuje wybrany post
   */
  update(post:IPost): Observable<HttpResponse<IPost>> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.http.put<IPost>(`${this.url}/${post.id}`, post, {
      headers,
      observe: 'response',
    });
  }

  /**
   * Usunięcie wybranego postu po id
   */
  delete(post:IPost): Observable<boolean> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.http.delete<boolean>(`${this.url}/${post.id}`, {
      headers,
    });
  }

  /**
   * Pobranie wybranego postu po id
   */
  getPostById2(id:number): Observable<HttpResponse<IPost>> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.http.get<IPost>(`${this.url}/${id}`, {
      headers,
      observe: 'response',
    });
  }
}