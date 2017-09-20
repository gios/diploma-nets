import * as joint from 'jointjs';
import { map, last } from 'lodash';

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
        'stroke-width': '2',
        'stroke': '#4b4a67'
      }
    },
    labels: [{
      position: 0.5,
      attrs: {
        text: {
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

function setLinkValue(link: joint.shapes.pn.Link, value: string | number) {
  link.label(0, { attrs: { text: { text: value} } } as any);
}

function getLinkByTransition(graph: joint.dia.Graph, transition: joint.dia.Cell) {
  const outbound = graph.getConnectedLinks(transition, { outbound: true });

  return map(outbound, (link) => {
    return getLinkValue(link);
  });
}

export function getConsumerValue(graph: joint.dia.Graph, customerTransition: joint.dia.Cell) {
  return last(getLinkByTransition(graph, customerTransition));
}

export function setConsumerValue(graph: joint.dia.Graph, customerTransition: joint.dia.Cell, value: string | number) {
  const outbound = graph.getConnectedLinks(customerTransition, { outbound: true });
  setLinkValue(last(outbound), value);
}

export function getSolarStationValue(graph: joint.dia.Graph, solarStationTransition: joint.dia.Cell) {
  return last(getLinkByTransition(graph, solarStationTransition));
}

export function setSolarStationValue(graph: joint.dia.Graph, solarStationTransition: joint.dia.Cell, value: string | number) {
  const outbound = graph.getConnectedLinks(solarStationTransition, { outbound: true });
  setLinkValue(last(outbound), value);
}

export function getElectroStationValue(graph: joint.dia.Graph, electroStationTransition: joint.dia.Cell) {
  return last(getLinkByTransition(graph, electroStationTransition));
}

export function setElectroStationValue(
  graph: joint.dia.Graph,
  electroStationTransition: joint.dia.Cell,
  value: string | number
) {
  const outbound = graph.getConnectedLinks(electroStationTransition, { outbound: true });
  setLinkValue(last(outbound), value);
}
