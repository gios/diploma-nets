import * as joint from 'jointjs';

import { ITransition } from './net.interface';

export function getTimeTransition(transitionModel: joint.dia.Cell) {
  return +transitionModel.attr('.label-time/text').split(' ')[2];
}

export function setTimeTransition(transitionModel: joint.dia.Cell, time: string | number) {
  transitionModel.attr('.label-time/text', `t = ${time}`);
}

const transitionBasis = new joint.shapes.pn.Transition({
  markup: `<g class="rotatable"><g class="scalable"><rect class="root"/></g></g>
  <text class="label"/><text class="label-time"/>`,
  position: {
    x: 400,
    y: 50
  },
  attrs: {
    '.label': {
      text: 'T3',
      fill: '#8a083e',
      'font-weight': 'bold'
    },
    '.label-time': {
      'text-anchor': 'middle',
      'ref-x': .5,
      'ref-y': 55,
      ref: 'rect',
      'font-size': 12,
      text: `t = 30`,
      fill: '#8a083e',
      'font-weight': 'bold'
    },
    '.root' : {
      fill: '#fac200',
      stroke: '#fac200'
    }
  }
});

export function generateTransitions(transitions: ITransition[]) {
  const generatedTransitions: joint.dia.Cell[] = [];

  transitions.forEach((transitionItem) => {
    const jointTransition = transitionBasis
    .attr({
      '.label': {
        text: transitionItem.name
      },
      '.label-time': {
        text: `t = ${transitionItem.time}`
      }
    })
    .position(transitionItem.x, transitionItem.y)
    .set('baseId', transitionItem.id)
    .clone() as joint.dia.Cell;
    generatedTransitions.push(jointTransition);
  });

  return generatedTransitions;
}
