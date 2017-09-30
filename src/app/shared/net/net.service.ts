import { Injectable, ElementRef } from '@angular/core';
import * as joint from 'jointjs';

import { INetAttributes } from './net.interface';
import { generateTransitions} from './transitions';
import { generatePinnacles } from './pinnacles';
import { generateConnections } from './linkConnections';

@Injectable()
export class NetService {

  constructor() { }

  generateNet(elementRef: ElementRef, graph: joint.dia.Graph, data: INetAttributes) {
    const generatedPinnacles = generatePinnacles(data.pinnacles);
    const generatedTransitions = generateTransitions(data.transitions);
    const generatedLinkedConnections = generateConnections(generatedPinnacles, generatedTransitions, data.connections);
    const paper = new joint.dia.Paper({
      el: elementRef.nativeElement,
      width: 2000,
      height: 1200,
      gridSize: 1,
      perpendicularLinks: true,
      interactive: false,
      model: graph
    });

    graph.addCell([
      ...generatedPinnacles,
      ...generatedTransitions,
      ...generatedLinkedConnections
    ]);

    return {
      paper,
      pinnacles: generatedPinnacles,
      transitions: generatedTransitions
    };
  }
}
