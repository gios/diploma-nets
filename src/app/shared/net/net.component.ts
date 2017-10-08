import {
  Component, ViewChild, ElementRef, OnDestroy, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges,
  Output, EventEmitter, OnInit
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
export class NetComponent implements OnDestroy, OnChanges, OnInit {
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
      }
      const netData = changes.data.currentValue;
      const { transitions } = this.netService.generateNet(this.paper, this.graph, netData);
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
