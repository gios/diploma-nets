import { Injectable, ElementRef } from '@angular/core';
import * as joint from 'jointjs';

import { INetAttributes, IPinnacle, ITransition, ILinkConnection } from './net.interface';
import { generateTransitions} from './transitions';
import { generatePinnacles } from './pinnacles';
import { generateConnections, getLinkValue } from './linkConnections';

@Injectable()
export class NetService {

  constructor() { }

  generateNet(paper: joint.dia.Paper, graph: joint.dia.Graph, data: INetAttributes) {
    const generatedPinnacles = generatePinnacles(data.pinnacles);
    const generatedTransitions = generateTransitions(data.transitions);
    const generatedLinkedConnections = generateConnections(generatedPinnacles, generatedTransitions, data.connections);

    graph.addCell([
      ...generatedPinnacles,
      ...generatedTransitions,
      ...generatedLinkedConnections
    ]);

    paper.fitToContent({ padding: 50 });

    return {
      pinnacles: generatedPinnacles,
      transitions: generatedTransitions
    };
  }

  getGeneratedPinnacles(pinnacles: IPinnacle[]) {
    return generatePinnacles(pinnacles);
  }

  getGeneratedTransitions(transitions: ITransition[]) {
    return generateTransitions(transitions);
  }

  getGeneratedConnections(
    pinnacles: joint.dia.Cell[],
    transitions: joint.dia.Cell[],
    connections: ILinkConnection[]
  ) {
    return generateConnections(pinnacles, transitions, connections);
  }

  getLinkValue(link: joint.shapes.pn.Link) {
    return getLinkValue(link);
  }
}
