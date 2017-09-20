import * as joint from 'jointjs';
import { map, last } from 'lodash';

const pn = joint.shapes.pn;

const defaultLinkOptions = {
  label: ''
};

export function link(connectFirst, connectSecond, options = defaultLinkOptions) {
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

  return new pn.Link(configLinkOptions);
}

export function getLinkValue(link) {
  const linkValue = link.get('labels')[0].attrs.text.text;
  return parseInt((linkValue) ? linkValue : 1, 10);
}

function setLinkValue(link, value) {
  link.label(0, { attrs: { text: { text: value} } });
}

function getLinkByTransition(graph, transition) {
  const outbound = graph.getConnectedLinks(transition, { outbound: true });

  return map(outbound, (link) => {
    return getLinkValue(link);
  });
}

export function getConsumerValue(graph, customerTransition) {
  return last(getLinkByTransition(graph, customerTransition));
}

export function setConsumerValue(graph, customerTransition, value) {
  const outbound = graph.getConnectedLinks(customerTransition, { outbound: true });
  setLinkValue(last(outbound), value);
}

export function getSolarStationValue(graph, solarStationTransition) {
  return last(getLinkByTransition(graph, solarStationTransition));
}

export function setSolarStationValue(graph, solarStationTransition, value) {
  const outbound = graph.getConnectedLinks(solarStationTransition, { outbound: true });
  setLinkValue(last(outbound), value);
}

export function getElectroStationValue(graph, electroStationTransition) {
  return last(getLinkByTransition(graph, electroStationTransition));
}

export function setElectroStationValue(graph, electroStationTransition, value) {
  const outbound = graph.getConnectedLinks(electroStationTransition, { outbound: true });
  setLinkValue(last(outbound), value);
}
