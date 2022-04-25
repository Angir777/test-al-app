import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   // Variables
   form: FormGroup;
   loading: boolean = false;
   errors: boolean = false;
   email!: string;
   password!: string;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.form = fb.group({
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        Validators.required
      ]
    });
  }

  ngOnInit(): void {
  }

  /**
   * Login the user based on the form values
   */
   login(): void {

    this.loading = true;
    this.errors = false;
    this.email = this.form.value.email;
    this.password = this.form.value.password;

    // nie działa po wyniesieniu do serwisu
    // this.authService.login(this.email, this.password)
    this.http.post('http://localhost:8000/api/login', {
      email: this.email,
      password: this.password,
    })
    .subscribe({
      next: (response) => {
        this.loading = false;
        // utworzenie klucza w aplikacji (google>Application>access_token)
        localStorage.setItem('access_token', JSON.stringify(response))
        // redirect
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
        this.errors = true;
      },
      complete: () => {},
    });

  }

}
