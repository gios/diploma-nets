import { V } from 'jointjs';
import { each, map, uniq, find, defer, invokeMap, min, isEmpty, cloneDeep } from 'lodash';

import { getLinkValue } from './linkConnections';
import { getTimeTransition } from './transitions';

export function fireTransition(graph, paper, transitions, globalDuration, callback) {
  const firableTransition = getFirableTransitionsCount(graph, paper, transitions);

  each(transitions, (transition: any) => {
    fireTransitionOnce(graph, paper, transition, getTimeTransition(transition), globalDuration, (name) => {
      callback(name);
    });
  });
}

function fireTransitionOnce(graph, paper, transition, sec, globalDuration, callback) {
  const inbound = graph.getConnectedLinks(transition, { inbound: true });
  const outbound = graph.getConnectedLinks(transition, { outbound: true });

  const placesBefore = map(inbound, (link: any) => {
    return graph.getCell(link.get('source').id);
  });

  const placesAfter = map(outbound, (link: any) => {
    return graph.getCell(link.get('target').id);
  });

  let isFirable = true;

  if (isEmpty(placesBefore) || isEmpty(placesAfter)) {
    isFirable = false;
  }

  each(placesBefore, (pinnacleModel) => {
    if (pinnacleModel.get('tokens') === 0) {
      isFirable = false;
    } else if (transition.get('firing')) {
      isFirable = false;
    } else if (getFilteredLinkCount(placesBefore, inbound) > 1) {
      isFirable = true;
    } else {
      isFirable = true;
    }
  });

  if (!isFirable) {
    return;
  }

  const differenceTokenValue = min(invokeMap(cloneDeep(placesBefore), 'get', 'tokens')) as number;
  transition.set('firing', true);
  transition.set('blocked', false);

  each(placesBefore, (pinnacleModel) => {
    const linked = find(inbound, (link: any) => {
      return link.get('source').id === pinnacleModel.id;
    });

    if (pinnacleModel.get('tokens') >= getLinkValue(linked) && (pinnacleModel.get('tokens') - differenceTokenValue) >= 0) {
      paper.findViewByModel(linked).sendToken((<any>V)('circle', { r: 5, fill: '#f5552a' }).node, sec * 1000,
        () => {
          if (getFilteredLinkCount(placesBefore, inbound) <= 1) {
            pinnacleModel.set('tokens', pinnacleModel.get('tokens') - getLinkValue(linked));
            transition.set('firing', false);
          } else {
            if ((pinnacleModel.get('tokens') - differenceTokenValue) >= 0) {
              pinnacleModel.set('tokens', pinnacleModel.get('tokens') - differenceTokenValue);
              transition.set('blocked', false);
            } else {
              transition.set('blocked', true);
            }
            transition.set('firing', false);
          }
        });
    }
  });

  let iterationCount = 0;
  let iterationCountSuccess = 0;

  each(placesAfter, (pinnacleModel) => {
    const linked = find(outbound, (link: any) => {
      return link.get('target').id === pinnacleModel.id;
    });

    if (differenceTokenValue > 0 && !transition.get('blocked')) {
      ++iterationCount;
      paper.findViewByModel(linked).sendToken((<any>V)('circle', { r: 5, fill: '#f5552a' }).node, sec * 1000,
        () => {
          if (getFilteredLinkCount(placesBefore, inbound) <= 1) {
            pinnacleModel.set('tokens', pinnacleModel.get('tokens') + getLinkValue(linked));
          } else {
            if (!transition.get('blocked')) {
              pinnacleModel.set('tokens', pinnacleModel.get('tokens') + differenceTokenValue);
            }
          }

          ++iterationCountSuccess;
          if (iterationCount === iterationCountSuccess) {
            transition.set('firing', false);
            defer(() => callback(transition.attr('.label/text')));
          }
        });
    } else {
      ++iterationCountSuccess;
      if (iterationCount === iterationCountSuccess) {
        transition.set('firing', false);
        defer(() => callback(transition.attr('.label/text')));
      }
    }
  });
}

function getFirableTransitionsCount(graph, paper, transitions) {
  let firableCount = 0;

  each(transitions, (transition) => {
    const inbound = graph.getConnectedLinks(transition, { inbound: true });

    const placesBefore = map(inbound, (link: any) => {
      return graph.getCell(link.get('source').id);
    });

    let isFirable = true;

    if (isEmpty(placesBefore)) {
      isFirable = false;
    }

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

  each(placesBefore, (pinnacleModel: any) => {
    const linked = find(inbound, (link: any) => {
      return link.get('source').id === pinnacleModel.id;
    });
    linkCount += 1;
  });
  return linkCount;
}

function isRealPinnacle(pinnacleModel) {
  return !!pinnacleModel.get('attrs')['.label'].text;
}
