import {
  Component, OnInit, ViewChild, ElementRef, OnDestroy, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges
} from '@angular/core';
import * as joint from 'jointjs';

import { NetService } from './net.service';
import { fireTransition } from './transitionAnimation';

@Component({
  selector: 'app-net',
  templateUrl: './net.component.html',
  styleUrls: ['./net.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NetService]
})
export class NetComponent implements OnInit, OnDestroy, OnChanges {
  transitions: joint.dia.Cell[];
  pinnacles: joint.dia.Cell[];
  graph = new joint.dia.Graph();
  paper: joint.dia.Paper;
  pendingStopTransitions = false;

  @Input() transitionState: boolean;
  @ViewChild('netSelector') netSelector: ElementRef;

  constructor(
    private netService: NetService
  ) {
    this.transitions = this.netService.getTransitions();
    this.pinnacles = this.netService.getPinnacles();
  }

  ngOnInit() {
    this.paper = new joint.dia.Paper({
      el: this.netSelector.nativeElement,
      width: 2000,
      height: 1200,
      gridSize: 1,
      perpendicularLinks: true,
      interactive: false,
      model: this.graph
    });

    this.graph.addCell([
      ...this.pinnacles,
      ...this.transitions
    ]);

    this.graph.addCell(this.netService.getLinkedConnections());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.transitionState.currentValue) {
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
    function simulate(graph: joint.dia.Graph, paper: joint.dia.Paper, transitions: joint.dia.Cell[]) {
      fireTransition(graph, paper, transitions, () => {
        if (this.pendingStopTransitions) {
          return;
        }
        setTimeout(() => simulate.call(this, graph, paper, transitions), 10);
      });
    }

    simulate.call(this, this.graph, this.paper, this.transitions);
  }
}
