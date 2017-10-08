import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { HttpService } from '../http.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  spinner = false;
  hidePassword = true;
  authForm: FormGroup;
  registrationState = false;
  private loginState$: Subscription;
  private auth$: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loginState$ = this.route.queryParams.subscribe(params => {
      if (params.registration) {
        this.registrationState = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.loginState$) {
      this.loginState$.unsubscribe();
    }

    if (this.auth$) {
      this.auth$.unsubscribe();
    }
  }

  onSubmit() {
    this.spinner = true;
    const { username, password } = this.authForm.controls;
    const authObj = {
      username: username.value,
      password: password.value
    };

    this.auth$ = this.http.post(`api/${this.registrationState ? 'registration' : 'login'}`, authObj)
      .subscribe(response => {
        const data = response.json();
        localStorage.setItem('token', data.token);
        this.router.navigate(['./home']);
        this.spinner = false;
        if (this.registrationState) {
          this.openSnackBar('User has been created');
        }
      }, (err) => {
        const errData = err.json();
        this.openSnackBar(errData.message);
        this.spinner = false;
      });
  }

  authToggleChange(event: any) {
    if (event.checked) {
      this.registrationState = true;
      this.router.navigate(['./login'], { queryParams: { registration: true } });
    } else {
      this.registrationState = false;
      this.router.navigate(['./login']);
    }
  }

  private createForm() {
    this.authForm = this.fb.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^[a-zA-Z\-]+$/)
      ])
      ],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])
      ]
    });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close');
  }
}
