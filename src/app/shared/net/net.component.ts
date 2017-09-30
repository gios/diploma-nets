import {
  Component, ViewChild, ElementRef, OnDestroy, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges,
  Output, EventEmitter
} from '@angular/core';
import * as joint from 'jointjs';
import { invokeMap } from 'lodash';

import { NetService } from './net.service';
import { fireTransition } from './transitionAnimation';
import { INetAttributes } from './net.interface';

@Component({
  selector: 'app-net',
  templateUrl: './net.component.html',
  styleUrls: ['./net.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NetService]
})
export class NetComponent implements OnDestroy, OnChanges {
  transitions: joint.dia.Cell[];
  graph = new joint.dia.Graph();
  paper: joint.dia.Paper;
  pendingStopTransitions = false;

  @Input() data: INetAttributes;
  @Input() transitionState: boolean;
  @Output() transitionStopped = new EventEmitter<boolean>();
  @ViewChild('netSelector') netSelector: ElementRef;

  constructor(
    private netService: NetService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue) {
      const netData = changes.data.currentValue;
      const { paper, transitions } = this.netService.generateNet(this.netSelector, this.graph, netData);
      this.paper = paper;
      this.transitions = transitions;
    }

    if (changes.transitionState && changes.transitionState.currentValue) {
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
    fireTransition(this.graph, this.paper, this.transitions, () => {
      const firedCount = invokeMap(this.transitions, 'get', 'firing').filter(item => !!item);
      if (!firedCount.length) {
        this.transitionStopped.emit(true);
      }

      if (this.pendingStopTransitions) {
        return;
      }
      setTimeout(() => this.simulation(), 10);
    });
  }
}
