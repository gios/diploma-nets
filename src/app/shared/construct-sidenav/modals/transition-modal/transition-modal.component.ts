import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Rx';

import { HttpService } from '../../../../http.service';

@Component({
  selector: 'app-transition-modal',
  templateUrl: './transition-modal.component.html',
  styleUrls: ['./transition-modal.component.scss']
})
export class TransitionModalComponent implements OnDestroy {
  transitionForm: FormGroup;
  spinner = false;
  private createTransition$: Subscription;

  constructor(
    public dialogRef: MatDialogRef<TransitionModalComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpService
  ) {
    this.createForm();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.createTransition$) {
      this.createTransition$.unsubscribe();
    }
  }

  onSubmit() {
    this.spinner = true;
    const { name, time, positionX, positionY } = this.transitionForm.controls;
    const data = {
      name: name.value,
      time: time.value,
      x: positionX.value,
      y: positionY.value
    };
    this.createTransition$ = this.http.post('api/net/transition', data)
      .subscribe(result => {
        const response = result.json();
        this.openSnackBar(`Transition ${response.name} has created`);
        this.dialogRef.close(response);
      });
  }

  private createForm() {
    this.transitionForm = this.fb.group({
      name: ['', Validators.required],
      time: ['', Validators.required],
      positionX: ['', Validators.required],
      positionY: ['', Validators.required]
    });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
