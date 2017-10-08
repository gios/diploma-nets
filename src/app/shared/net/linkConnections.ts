import * as joint from 'jointjs';
import { find } from 'lodash';

import { ILinkConnection } from './net.interface';

const defaultLinkOptions = {
  label: ''
};

export function link(
  id: number,
  connectFirst: joint.dia.Cell,
  connectSecond: joint.dia.Cell,
  options = defaultLinkOptions
) {
  options = Object.assign({}, defaultLinkOptions, options);
  const { label } = options;
  const configLinkOptions = {
    id,
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
  connections.forEach((connectionItem) => {
    let options = null;
    const connectedItems = connectionItem.connect.map((item) => {
      let foundItem: joint.dia.Cell;
      if (item.type === 'pinnacle') {
        foundItem = find(pinnacles, ['attributes.baseId', item.id]);
      } else {
        foundItem = find(transitions, ['attributes.baseId', item.id]);
      }
      foundItem.set('connectionType', item.type);
      return foundItem;
    });

    if (connectionItem.value > 1) {
      options = { label: connectionItem.value.toString() };
    }
    generatedConnections.push(link(connectionItem.id, connectedItems[0], connectedItems[1], options));
  });

  return generatedConnections;
}
