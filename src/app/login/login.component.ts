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

    const email = this.form.value.email;
    const password = this.form.value.password;

      // nie działa po wynienieniu do serwisu

    this.http.post('http://localhost:8000/api/login', {
      email: email,
      password: password,
    }).subscribe((res: any)=>{
      this.loading = false;
      //console.log(res);
      localStorage.setItem('access_token', JSON.stringify(res))

      // redirect
      this.router.navigate(['/']);
    },
    err=>{
      console.log(err);
      this.loading = false;
      this.errors = true;
    });
  }

  /**
   * Getter for the form controls
   */
  get controls() {
    return this.form.controls;
  }

}
