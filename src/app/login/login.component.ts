import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventManagerService } from '../shared/services/event-manager/event-manager.service';

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
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    private eventManager: EventManagerService,
  ) {
    // Wywołujemy funkcje na start - Utworzy nam formularz
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
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

    this.authService.login(this.email, this.password)
    .subscribe({
      next: (response) => {
        this.loading = false;
        // utworzenie klucza w aplikacji (google>Application>user_info)
        localStorage.setItem('user_info', JSON.stringify(response))
        // login status event
        this.eventManager.broadcastEvent({
          name: 'ON_AUTH_CHANGED',
          content: {
            isLogin: true,
          }
        })
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
