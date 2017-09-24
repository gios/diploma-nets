import { V } from 'jointjs';
import { each, map, uniq, find, defer, invokeMap, min, isEmpty, cloneDeep } from 'lodash';

import { getLinkValue } from './linkConnections';
import { getTimeTransition } from './transitions';

export function fireTransition(graph, paper, transitions, globalDuration, callback) {
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
    } else if (getLinkCount(placesBefore, inbound) > 1) {
      isFirable = true;
    } else {
      isFirable = true;
    }
  });

  if (!isFirable) {
    return;
  }

  transition.set('firing', true);
  transition.set('blocked', false);

  const differenceTokenValue = min(invokeMap(cloneDeep(placesBefore), 'get', 'tokens')) as number;

  if (canTransitFrom(placesBefore, inbound)) {
    each(placesBefore, (pinnacleModel) => {
      let innerCounter = 0;
      const linked = getLinked(pinnacleModel, inbound, 'source');

      paper.findViewByModel(linked).sendToken((<any>V)('circle', { r: 5, fill: '#f5552a' }).node, sec * 1000,
      () => {
        if (canTransitFrom(placesBefore, inbound)) {
          if (getLinkCount(placesBefore, inbound) <= 1) {
            pinnacleModel.set('tokens', pinnacleModel.get('tokens') - getLinkValue(linked));
          } else {
            pinnacleModel.set('tokens', pinnacleModel.get('tokens') - differenceTokenValue);
          }
        } else {
          transition.set('blocked', true);
        }

        ++innerCounter;
        transition.set('firing', false);
      });
    });
  } else {
    transition.set('firing', false);
    transition.set('blocked', true);
  }

  const placesAfterCount = getLinkCount(placesAfter, inbound);
  let placesAfterCountSuccess = 0;

  if (transition.get('blocked')) {
    return;
  }

  each(placesAfter, (pinnacleModel) => {
    const linked = getLinked(pinnacleModel, outbound, 'target');

    paper.findViewByModel(linked).sendToken((<any>V)('circle', { r: 5, fill: '#f5552a' }).node, sec * 1000,
    () => {
      if (!transition.get('blocked')) {
        if (getLinkCount(placesBefore, inbound) <= 1) {
          pinnacleModel.set('tokens', pinnacleModel.get('tokens') + getLinkValue(linked));
        } else {
          pinnacleModel.set('tokens', pinnacleModel.get('tokens') + differenceTokenValue);
        }
      }

      ++placesAfterCountSuccess;
      if (placesAfterCount === placesAfterCountSuccess) {
        callback(transition.attr('.label/text'));
      }
    });
  });
}

function getLinkCount(places, bound) {
  let linkCount = 0;

  each(places, (pinnacleModel: any) => {
    const linked = find(bound, (link: any) => {
      return link.get('source').id === pinnacleModel.id;
    });
    linkCount += 1;
  });
  return linkCount;
}

function isRealPinnacle(pinnacleModel) {
  return !!pinnacleModel.get('attrs')['.label'].text;
}

function getLinked(pinnacleModel, bound, state) {
  return find(bound, (link: any) => {
    return link.get(state).id === pinnacleModel.id;
  });
}

function canTransitFrom(placesBefore, inbound) {
  const placesBeforeCount = getLinkCount(placesBefore, inbound);
  let placesBeforeCountSuccess = 0;

  each(placesBefore, (pinnacleModel: any) => {
    const linked = getLinked(pinnacleModel, inbound, 'source');

    if (pinnacleModel.get('tokens') >= getLinkValue(linked)) {
      ++placesBeforeCountSuccess;
    }
  });

  return placesBeforeCount === placesBeforeCountSuccess;
}
