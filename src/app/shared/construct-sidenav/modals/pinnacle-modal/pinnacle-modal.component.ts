import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Rx';

import { HttpService } from '../../../../http.service';

@Component({
  selector: 'app-pinnacle-modal',
  templateUrl: './pinnacle-modal.component.html',
  styleUrls: ['./pinnacle-modal.component.scss']
})
export class PinnacleModalComponent implements OnDestroy {
  pinnacleForm: FormGroup;
  spinner = false;
  private createPinnacle$: Subscription;

  constructor(
    private dialogRef: MatDialogRef<PinnacleModalComponent>,
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
    if (this.createPinnacle$) {
      this.createPinnacle$.unsubscribe();
    }
  }

  onSubmit() {
    this.spinner = true;
    const { name, value, positionX, positionY } = this.pinnacleForm.controls;
    const data = {
      name: name.value,
      value: value.value,
      x: positionX.value,
      y: positionY.value
    };
    this.createPinnacle$ = this.http.post('api/net/pinnacle', data)
      .subscribe(result => {
        const response = result.json();
        this.openSnackBar(`Pinnacle ${response.name} has created`);
        this.dialogRef.close(response);
        this.spinner = false;
      }, () => this.spinner = false);
  }

  private createForm() {
    this.pinnacleForm = this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
      positionX: ['', Validators.required],
      positionY: ['', Validators.required]
    });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close');
  }
}
