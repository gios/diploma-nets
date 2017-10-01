import * as joint from 'jointjs';

import { IPinnacle } from './net.interface';

const pinnacle = new joint.shapes.pn.Place({
  position: {
    x: 200,
    y: 50
  },
  attrs: {
    '.label': {
      fill: '#be0037',
      'font-weight': 'bold'
    },
    '.root' : {
      stroke: '#fac200',
      'stroke-width': 3
    },
    '.tokens > circle': {
      fill : '#fac200'
    }
  },
  tokens: 1
});

export function generatePinnacles(pinnacles: IPinnacle[]) {
  const generatedPinnacles: joint.dia.Cell[] = [];

  pinnacles.forEach((pinnacleItem) => {
    const jointPinnacle = pinnacle
    .attr({
      '.label': {
        text: pinnacleItem.name
      }
    })
    .position(pinnacleItem.x, pinnacleItem.y)
    .set('tokens', pinnacleItem.value)
    .set('baseName', pinnacleItem.name)
    .clone() as joint.dia.Cell;
    generatedPinnacles.push(jointPinnacle);
  });

  return generatedPinnacles;
}
