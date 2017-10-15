import { Component, OnInit, OnDestroy } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Subscription, Observable } from 'rxjs/Rx';
import { MatSnackBar } from '@angular/material';
import { orderBy, sortBy, first, groupBy } from 'lodash';

import { HttpService } from '../http.service';
import { IPinnacle } from '../shared/net/net.interface';
import { defaultChartColors } from './visualization.constants';

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
  chartData: any[];
  colorsMap = new Map();
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
      this.chartData = this.transformChartData(data);
    }, (err) => {
      const errData = err.json();
      this.openSnackBar(errData.message);
    });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close');
  }

  private transformChartData(data: any[]): any {
    let colorIndex = 0;
    const chartData = [];
    const groupedItems = groupBy(data, 'pinnacleId') as any;

    for (const key in groupedItems) {
      if (groupedItems.hasOwnProperty(key)) {
        const element = groupedItems[key];
        if (element.length) {
          const color = this.colorsMap.has(key) ? this.colorsMap.get(key) : defaultChartColors[colorIndex];
          chartData.push({
            label: element[0].name,
            borderColor: color,
            backgroundColor: color.replace(/[^,]+(?=\))/, '0.1'),
            pointRadius: 0,
            data: element.map(item => {
              return {
                x: item.time,
                y: item.value
              };
            })
          });
          this.colorsMap.set(key, color);
          ++colorIndex;
        }
      }
    }
    return chartData;
  }
}
