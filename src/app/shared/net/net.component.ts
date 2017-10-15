import {
  Component, ViewChild, ElementRef, OnDestroy, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges,
  Output, EventEmitter, OnInit
} from '@angular/core';
import * as joint from 'jointjs';
import { invokeMap } from 'lodash';

import { NetService } from './net.service';
import { fireTransition } from './transitionAnimation';
import { INetAttributes, ISaveHistory } from './net.interface';

@Component({
  selector: 'app-net',
  templateUrl: './net.component.html',
  styleUrls: ['./net.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NetService]
})
export class NetComponent implements OnDestroy, OnChanges, OnInit {
  transitions: joint.dia.Cell[];
  graph = new joint.dia.Graph();
  paper: joint.dia.Paper;
  startInterval: number;
  lastIntervalTime: number;
  pendingStopTransitions = false;

  @Input() data: INetAttributes;
  @Input() transitionState: boolean;
  @Output() transitionStopped = new EventEmitter<boolean>();
  @Output() setHistory = new EventEmitter<ISaveHistory>();
  @ViewChild('netSelector') netSelector: ElementRef;

  constructor(
    private netService: NetService
  ) { }

  ngOnInit() {
    this.paper = new joint.dia.Paper({
      el: this.netSelector.nativeElement,
      width: 1,
      height: 1,
      gridSize: 1,
      perpendicularLinks: true,
      interactive: false,
      model: this.graph
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue) {
      if (this.graph) {
        this.graph.clear();
        this.lastIntervalTime = null;
      }
      const netData = changes.data.currentValue;
      const { transitions } = this.netService.generateNet(this.paper, this.graph, netData);
      this.transitions = transitions;
    }

    if (changes.transitionState && changes.transitionState.currentValue) {
      this.startInterval = +new Date();
      this.pendingStopTransitions = false;
      this.startInfinityTransition();
    } else {
      this.pendingStopTransitions = true;
    }
  }

  ngOnDestroy() {
    this.graph.clear();
    this.paper.remove();
  }

  startInfinityTransition() {
    this.simulation();
  }

  simulation() {
    fireTransition(this.graph, this.paper, this.transitions, (saveData) => {
      const endInterval = +new Date();
      const time = Math.round((endInterval - this.startInterval) / 1000);
      Object.assign(saveData, {
        time: this.lastIntervalTime ? time + this.lastIntervalTime : time
      });
      this.setHistory.emit(saveData as ISaveHistory);
      const firedCount = invokeMap(this.transitions, 'get', 'firing').filter(item => !!item);
      if (!firedCount.length) {
        this.lastIntervalTime = time;
        this.transitionStopped.emit(true);
      }

      if (this.pendingStopTransitions) {
        return;
      }
      setTimeout(() => this.simulation(), 10);
    });
  }
}
