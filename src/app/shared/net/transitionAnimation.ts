import { V } from 'jointjs';
import { each, map, uniq, find, defer, invoke, min } from 'lodash';

import { getLinkValue } from './linkConnections';
import { setBaseTransition, getBaseTransition, getTimeTransition } from './transitions';

const dottedLink = '2,5';
let transitionFireCount = 0;

export function fireTransition(graph, paper, transitions, globalDuration, callback) {
  let finishDelay = [];
  const firableTransition = getFirableTransitionsCount(graph, paper, transitions);

  each(transitions, (transition) => {
    fireTransitionOnce(graph, paper, transition, getTimeTransition(transition), globalDuration, (name) => {
      if(firableTransition === finishDelay.length) {
        transitionFireCount += 1;
        callback(transitionFireCount);
      }
      finishDelay.push(name);
      finishDelay = uniq(finishDelay);
    });
  });
}

function fireTransitionOnce(graph, paper, transition, sec, globalDuration, callback) {
  const inbound = graph.getConnectedLinks(transition, { inbound: true });
  const outbound = graph.getConnectedLinks(transition, { outbound: true });

  const placesBefore = map(inbound, (link) => {
    return graph.getCell(link.get('source').id);
  });

  const placesAfter = map(outbound, (link) => {
    return graph.getCell(link.get('target').id);
  });

  let isFirable = true;
  each(placesBefore, (pinnacleModel) => {
    if (pinnacleModel.get('tokens') === 0) {
      isFirable = false;
    } else if (getFilteredLinkCount(placesBefore, inbound) > 1) {
      isFirable = true;
    } else {
      isFirable = true;
    }
  });

  if (isFirable) {
    each(placesBefore, (pinnacleModel) => {
      const linked = find(inbound, (link) => {
        return link.get('source').id === pinnacleModel.id;
      });

      if (linked.attr('.connection/stroke-dasharray') !== dottedLink) {
        if (pinnacleModel.get('tokens') >= getLinkValue(linked)) {
          setBaseTransition(transition, getBaseTransition(transition) + (inbound.length) ? 1 : 0);
          paper.findViewByModel(linked).sendToken(V('circle', { r: 5, fill: '#feb662' }).node, (sec * 1000) / (30 / globalDuration));

          defer(() => {
            if (getFilteredLinkCount(placesBefore, inbound) <= 1) {
              pinnacleModel.set('tokens', pinnacleModel.get('tokens') - getLinkValue(linked));
            }
          });
        }
      }
    });

    let differenceTokenValue;

    if (getFilteredLinkCount(placesBefore, inbound) > 1) {
      differenceTokenValue = min(invoke(placesBefore, 'get', 'tokens'));
      each(placesBefore, (pinnacleModel) => {
        pinnacleModel.set('tokens', pinnacleModel.get('tokens') - differenceTokenValue);
      });
    }

    each(placesAfter, (pinnacleModel) => {
      const linked = find(outbound, (link) => {
        return link.get('target').id === pinnacleModel.id;
      });

      if (getBaseTransition(transition) > 0 && differenceTokenValue !== 0) {
        paper.findViewByModel(linked).sendToken(V('circle', { r: 5, fill: '#feb662' }).node, (sec * 1000) / (30 / globalDuration), () => {
          if (getFilteredLinkCount(placesBefore, inbound) <= 1) {
            pinnacleModel.set('tokens', pinnacleModel.get('tokens') + getLinkValue(linked));
          } else {
            pinnacleModel.set('tokens', pinnacleModel.get('tokens') + differenceTokenValue);
          }
          setBaseTransition(transition, (getBaseTransition(transition) === 0) ? 0 : getBaseTransition(transition) - 1);
          callback(transition.attr('.label/text'));
        });
      } else {
        callback(transition.attr('.label/text'));
      }
    });
  }
}

function getFirableTransitionsCount(graph, paper, transitions) {
  let firableCount = 0;

  each(transitions, (transition) => {
    const inbound = graph.getConnectedLinks(transition, { inbound: true });

    const placesBefore = map(inbound, (link) => {
      return graph.getCell(link.get('source').id);
    });

    let isFirable = true;
    each(placesBefore, (model) => {
      if (model.get('tokens') === 0) {
        isFirable = false;
      }
    });

    if (isFirable) {
      firableCount += 1;
    }
  });
  return firableCount;
}

function getFilteredLinkCount(placesBefore, inbound) {
  let linkCount = 0;

  each(placesBefore, (pinnacleModel) => {
    const linked = find(inbound, (link) => {
      return link.get('source').id === pinnacleModel.id;
    });

    if (linked.attr('.connection/stroke-dasharray') !== dottedLink) {
      linkCount += 1;
    }
  });
  return linkCount;
}
