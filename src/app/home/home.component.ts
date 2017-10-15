import { Component, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { isEmpty } from 'lodash';

import { HttpService } from '../http.service';
import { IInputButtons } from '../shared/toolbar/toolbar';
import { INetAttributes, ISaveHistory } from '../shared/net/net.interface';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../app.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  spinner = false;
  netData: INetAttributes;
  transitionState: boolean;
  disableContructionMenu = false;
  noData = false;
  toolbarButtons: IInputButtons[] = [
    {
      text: 'Start Transition',
      disabled: false,
      type: 'primary',
      icon: null,
      click: this.startTransition.bind(this)
    },
    {
      text: 'Stop Transition',
      disabled: true,
      type: 'warn',
      icon: 'cached',
      click: this.stopTransition.bind(this)
    }
  ];
  private defaultNet$: Subscription;
  private startHistory$: Subscription;
  private setHistory$: Subscription;
  private startHistoryId: number;

  constructor(
    private http: HttpService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.spinner = true;
    this.defaultNet$ = this.http.get('api/net').subscribe(response => {
      const data = response.json();
      this.netData = data;
      this.noData = isEmpty(this.netData.pinnacles) && isEmpty(this.netData.transitions) && isEmpty(this.netData.connections);
      this.spinner = false;
    }, (err) => {
      const errData = err.json();
      this.openSnackBar(errData.message);
      this.spinner = false;
    });
  }

  ngOnDestroy() {
    if (this.defaultNet$) {
      this.defaultNet$.unsubscribe();
    }

    if (this.startHistory$) {
      this.startHistory$.unsubscribe();
    }

    if (this.setHistory$) {
      this.setHistory$.unsubscribe();
    }
  }

  startTransition() {
    this.disableContructionMenu = true;
    if (this.startHistoryId) {
      this.transitionState = true;
      this.toolbarButtons[0].disabled = true;
      this.toolbarButtons[1].disabled = false;
    } else {
      this.startRecordHistory(() => {
        this.transitionState = true;
        this.toolbarButtons[0].disabled = true;
        this.toolbarButtons[1].disabled = false;
      });
    }
  }

  stopTransition() {
    this.transitionState = false;
    this.toolbarButtons[0].disabled = true;
    this.toolbarButtons[1].disabled = true;
  }

  transitionStopped() {
    this.toolbarButtons[0].disabled = false;
    this.disableContructionMenu = false;
  }

  setHistory(savedData: ISaveHistory) {
    Object.assign(savedData, { historyId: this.startHistoryId });
    this.setHistory$ = this.http.post('api/net/history', savedData).subscribe(response => {
      const data = response.json();
      this.openSnackBar(data.message);
    }, (err) => {
      const errData = err.json();
      this.openSnackBar(errData.message);
    });
  }

  changedNet(event: INetAttributes) {
    this.netData = event;
    this.noData = isEmpty(this.netData.pinnacles) && isEmpty(this.netData.transitions) && isEmpty(this.netData.connections);
    this.startHistoryId = null;
  }

  private startRecordHistory(callback: () => void) {
    this.startHistory$ = this.http.post('api/net/history-start', null).subscribe(response => {
      const data = response.json();
      this.startHistoryId = data.id;
      callback();
    }, (err) => {
      const errData = err.json();
      this.openSnackBar(errData.message);
    });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close');
  }
}
