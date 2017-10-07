import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  hidePassword = true;
  authForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  private createForm() {
    this.authForm = this.fb.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z\-]+$/)
      ])
      ],
      password: ['', Validators.required]
    });
  }
}
