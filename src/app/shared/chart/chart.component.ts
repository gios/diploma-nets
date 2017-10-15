import { Component, OnChanges, ViewChild, ElementRef, SimpleChanges, Input } from '@angular/core';
import { Chart } from 'chart.js';

import { defaultChartColors } from './chart.constants';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges {
  private firstRender = false;
  private chart: Chart;
  @ViewChild('chartElem') chartElem: ElementRef;
  @Input() data;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
      this.renderChart(changes.data.currentValue);
    }
  }

  private renderChart(data) {
    data.forEach(element => {
      const randomNumber = Math.random() * (defaultChartColors.length - 1);
      const randomColor = defaultChartColors[Math.round(randomNumber)];
      Object.assign(element, {
        borderColor: randomColor
      });
    });

    if (this.chart) {
      this.chart.data.datasets = data;
      this.chart.update();
    } else {
      this.chart = new Chart(this.chartElem.nativeElement, {
        type: 'line',
        data: {
          datasets: data
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              type: 'linear',
              position: 'bottom'
            }]
          }
        }
      });
    }
  }
}
