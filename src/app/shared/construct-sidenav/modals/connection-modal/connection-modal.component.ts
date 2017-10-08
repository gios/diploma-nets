import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Subscription, Observable } from 'rxjs/Rx';
import { find } from 'lodash';

import { HttpService } from '../../../../http.service';

@Component({
  selector: 'app-connection-modal',
  templateUrl: './connection-modal.component.html',
  styleUrls: ['./connection-modal.component.scss']
})
export class ConnectionModalComponent implements OnDestroy {
  connectionForm: FormGroup;
  spinner = false;
  filteredEntitiesFrom: Observable<any>;
  filteredEntitiesTo: Observable<any>;
  private createConnection$: Subscription;

  constructor(
    private dialogRef: MatDialogRef<ConnectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
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
    if (this.createConnection$) {
      this.createConnection$.unsubscribe();
    }
  }

  onSubmit() {
    this.spinner = true;
    const { value, from, to } = this.connectionForm.controls;
    const fromValue: any = find(this.data.entities, ['name', from.value]);
    const toValue: any = find(this.data.entities, ['name', to.value]);
    const data = {
      value: value.value,
      connect: [
        {
          id: fromValue.id,
          type: fromValue.time !== undefined ? 'transition' : 'pinnacle'
        },
        {
          id: toValue.id,
          type: toValue.time !== undefined ? 'transition' : 'pinnacle'
        }
      ]
    };
    this.createConnection$ = this.http.post('api/net/connection', data)
      .subscribe(result => {
        const response = result.json();
        this.openSnackBar(`Connection has created`);
        this.dialogRef.close(response);
        this.spinner = false;
      }, () => this.spinner = false);
  }

  private createForm() {
    this.connectionForm = this.fb.group({
      from: ['', Validators.required],
      value: ['', Validators.required],
      to: ['', Validators.required]
    });

    const { from, to } = this.connectionForm.controls;
    this.filteredEntitiesFrom = from.valueChanges
      .startWith(null)
      .map(value => value ? this.filterData(value) : this.data.entities.slice());

    this.filteredEntitiesTo = to.valueChanges
      .startWith(null)
      .map(value => value ? this.filterData(value) : this.data.entities.slice());
  }

  private filterData(value: string) {
    return this.data.entities.filter(data =>
      data.name.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
