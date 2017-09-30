import * as joint from 'jointjs';
import { find } from 'lodash';

import { ILinkConnection } from './net.interface';

const defaultLinkOptions = {
  label: ''
};

export function link(
  connectFirst: joint.dia.Cell,
  connectSecond: joint.dia.Cell,
  options = defaultLinkOptions
) {
  options = Object.assign({}, defaultLinkOptions, options);
  const { label } = options;
  const configLinkOptions = {
    source: {
      id: connectFirst.id,
      selector: '.root'
    },
    target: {
      id: connectSecond.id,
      selector: '.root'
    },
    attrs: {
      '.connection': {
        'fill': 'none',
        'stroke-linejoin': 'round',
        'stroke-width': '1',
        'stroke': '#5d5d5e'
      },
      '.marker-target': {
        'fill': '#5d5d5e',
        'stroke': '#5d5d5e',
      }
    },
    labels: [{
      position: 0.5,
      attrs: {
        rect: {
          fill: '#fafafa',
        },
        text: {
          fill: '#5d5d5e',
          text: `${label}`
        }
      }
    }]
  };

  return new joint.shapes.pn.Link(configLinkOptions);
}

export function getLinkValue(link: joint.shapes.pn.Link) {
  const linkValue = link.get('labels')[0].attrs.text.text;
  return parseInt((linkValue) ? linkValue : 1, 10);
}

export function generateConnections(
  pinnacles: joint.dia.Cell[],
  transitions: joint.dia.Cell[],
  connections: ILinkConnection[]
) {
  const generatedConnections: joint.shapes.pn.Link[] = [];
  let options = null;

  connections.forEach((connectionItem) => {
    const connectedItems = connectionItem.connect.map((item) => {
      return item.type === 'pinnacle'
      ? find(pinnacles, ['attributes.baseId', item.id])
      : find(transitions, ['attributes.baseId', item.id]);
    });

    if (connectionItem.value > 1) {
      options = { label: connectionItem.value.toString() };
    }
    generatedConnections.push(link(connectedItems[0], connectedItems[1], options));
  });

  return generatedConnections;
}
