import { V } from 'jointjs';
import { each, map, uniq, find, defer, invokeMap, min, isEmpty } from 'lodash';

import { getLinkValue } from './linkConnections';
import { getTimeTransition } from './transitions';

export function fireTransition(
  graph: joint.dia.Graph,
  paper: joint.dia.Paper,
  transitions: joint.dia.Cell[],
  callback) {
  each(transitions, (transition) => {
    fireTransitionOnce(graph, paper, transition, getTimeTransition(transition), (name: string) => {
      callback(name);
    });
  });
}

function fireTransitionOnce(
  graph: joint.dia.Graph,
  paper: joint.dia.Paper,
  transition: joint.dia.Cell,
  sec: number,
  callback) {
  const inbound = graph.getConnectedLinks(transition, { inbound: true });
  const outbound = graph.getConnectedLinks(transition, { outbound: true });

  const placesBefore = map(inbound, (link) => {
    return graph.getCell(link.get('source').id);
  });

  const placesAfter = map(outbound, (link) => {
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

  if (canTransitTo(placesBefore, inbound)) {
    each(placesBefore, (pinnacleModel, index) => {
      const linked = getLinked(pinnacleModel, inbound, 'source');

      (<any> paper.findViewByModel(linked)).sendToken((<any>V)('circle', { r: 5, fill: '#f5552a' }).node, sec * 1000,
      () => {
        if (index === placesBefore.length - 1) {
          if (canTransitTo(placesBefore, inbound)) {
            placesBefore.forEach(pinnacle => {
              pinnacle.set('tokens', pinnacle.get('tokens') - getLinkValue(getLinked(pinnacle, inbound, 'source')));
            });
            transition.set('firing', false);
          } else {
            transition.set('blocked', true);
          }
        }
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

    (<any> paper.findViewByModel(linked)).sendToken((<any>V)('circle', { r: 5, fill: '#f5552a' }).node, sec * 1000,
    () => {
      if (!transition.get('blocked')) {
        pinnacleModel.set('tokens', pinnacleModel.get('tokens') + getLinkValue(linked));
      }

      ++placesAfterCountSuccess;
      if (placesAfterCount === placesAfterCountSuccess) {
        callback(transition.attr('.label/text'));
      }
    });
  });
}

function getLinkCount(places: joint.dia.Cell[], bound: joint.dia.Link[]) {
  let linkCount = 0;

  each(places, (pinnacleModel) => {
    const linked = find(bound, (link) => {
      return link.get('source').id === pinnacleModel.id;
    });
    linkCount += 1;
  });
  return linkCount;
}

function isRealPinnacle(pinnacleModel: joint.dia.Cell) {
  return !!pinnacleModel.get('attrs')['.label'].text;
}

function getLinked(pinnacleModel: joint.dia.Cell, bound: joint.dia.Link[], state: string) {
  return find(bound, (link) => {
    return link.get(state).id === pinnacleModel.id;
  });
}

function canTransitTo(placesBefore: joint.dia.Cell[], inbound: joint.dia.Link[]) {
  const placesBeforeCount = getLinkCount(placesBefore, inbound);
  let placesBeforeCountSuccess = 0;

  each(placesBefore, (pinnacleModel) => {
    const linked = getLinked(pinnacleModel, inbound, 'source');

    if (pinnacleModel.get('tokens') >= getLinkValue(linked)) {
      ++placesBeforeCountSuccess;
    }
  });

  return placesBeforeCount === placesBeforeCountSuccess;
}
