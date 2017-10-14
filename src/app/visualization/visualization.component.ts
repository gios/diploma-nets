import { Component, OnInit, OnDestroy } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Subscription, Observable } from 'rxjs/Rx';
import { MatSnackBar } from '@angular/material';
import { orderBy, sortBy, first } from 'lodash';

import { HttpService } from '../http.service';
import { IPinnacle } from '../shared/net/net.interface';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent implements OnInit, OnDestroy {
  historySessions: any[];
  pinnacles: IPinnacle[];
  selectedSession: number;
  selectedPinnacles: any;
  private getHistorySessionsAndPinnacles$: Subscription;
  private getHistory$: Subscription;

  constructor(
    private http: HttpService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getHistorySessionsAndPinnacles$ = Observable.forkJoin([
      this.getHistorySessions(),
      this.getPinnacles()
    ]).subscribe(response => {
      const historySessions = response[0].json();
      const pinnacles = response[1].json();
      this.historySessions = orderBy(historySessions, ['createdAt'], ['desc']);
      this.selectedSession = first(this.historySessions).id;
      this.pinnacles = sortBy(pinnacles, ['name']) as IPinnacle[];
      this.selectedPinnacles = this.pinnacles.map(pinnacle => pinnacle.id);
      this.getHistory();
    }, (err) => {
      const errData = err.json();
      this.openSnackBar(errData.message);
    });
  }

  ngOnDestroy() {
    if (this.getHistorySessionsAndPinnacles$) {
      this.getHistorySessionsAndPinnacles$.unsubscribe();
    }

    if (this.getHistory$) {
      this.getHistory$.unsubscribe();
    }
  }

  changeSession(event) {
    this.getHistory();
  }

  changePinnacle(event) {
    this.getHistory();
  }

  private getHistorySessions() {
    return this.http.get('api/net/history-sessions');
  }

  private getPinnacles() {
    return this.http.get('api/net/pinnacles');
  }

  private getHistory() {
    const params: URLSearchParams = new URLSearchParams();
    params.set('pinnacleIds', this.selectedPinnacles);
    this.getHistory$ = this.http.get(`api/net/history/${this.selectedSession}`, {
      search: params
    })
    .subscribe(response => {
      const data = response.json();
      console.log('EMITED DATA ', data);
    }, (err) => {
      const errData = err.json();
      this.openSnackBar(errData.message);
    });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close');
  }
}
