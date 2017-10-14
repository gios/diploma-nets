import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
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
  private getHistorySessions$: Subscription;
  private getPinnacles$: Subscription;

  constructor(
    private http: HttpService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getHistorySessions();
    this.getPinnacles();
  }

  ngOnDestroy() {
    if (this.getHistorySessions$) {
      this.getHistorySessions$.unsubscribe();
    }

    if (this.getPinnacles$) {
      this.getPinnacles$.unsubscribe();
    }
  }

  private getHistorySessions() {
    this.getHistorySessions$ = this.http.get('api/net/history-sessions').subscribe(response => {
      const data = response.json();
      this.historySessions = orderBy(data, ['createdAt'], ['desc']);
      this.selectedSession = first(this.historySessions).id;
    }, (err) => {
      const errData = err.json();
      this.openSnackBar(errData.message);
    });
  }

  private getPinnacles() {
    this.getPinnacles$ = this.http.get('api/net/pinnacles').subscribe(response => {
      const data = response.json();
      this.pinnacles = sortBy(data, ['name']) as IPinnacle[];
      this.selectedPinnacles = this.pinnacles.map(pinnacle => pinnacle.id);
    }, (err) => {
      const errData = err.json();
      this.openSnackBar(errData.message);
    });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close');
  }
}
