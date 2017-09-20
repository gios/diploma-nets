import * as joint from 'jointjs';

export function setBaseTransition(transitionModel: joint.shapes.pn.Transition, base: string | number) {
  transitionModel.attr('.label-base/text', `b = ${base}`);
}

export function getBaseTransition(transitionModel: joint.shapes.pn.Transition) {
  return +transitionModel.attr('.label-base/text').split(' ')[2];
}

export function getTimeTransition(transitionModel: joint.shapes.pn.Transition) {
  return +transitionModel.attr('.label-time/text').split(' ')[2];
}

export function setTimeTransition(transitionModel: joint.shapes.pn.Transition, time: string | number) {
  transitionModel.attr('.label-time/text', `t = ${time}`);
}

const transitionBasis = new joint.shapes.pn.Transition({
  markup: `<g class="rotatable"><g class="scalable"><rect class="root"/></g></g>
  <text class="label"/><text class="label-time"/><text class="label-base"/>`,
  position: {
    x: 400,
    y: 50
  },
  attrs: {
    '.label': {
      text: 'T3',
      fill: '#fe854f'
    },
    '.label-time': {
      'text-anchor': 'middle',
      'ref-x': .5,
      'ref-y': 55,
      ref: 'rect',
      'font-size': 12,
      text: `t = 30`,
      fill: '#fe854f',
      'font-weight': 'bold'
    },
    '.label-base': {
      'text-anchor': 'middle',
      'ref-x': .5,
      'ref-y': 70,
      ref: 'rect',
      'font-size': 12,
      text: 'b = 0',
      fill: '#fe854f',
      'font-weight': 'bold'
    },
    '.root' : {
      fill: '#9586fd',
      stroke: '#9586fd'
    }
  }
});

export let transitionT3 = transitionBasis.attr({
  '.label': {
    text: 'T3'
  },
  '.label-time': {
    text: 't = 30'
  },
  '.label-base': {
    text: 'b = 0'
  }
}).position(400, 50).clone();


export let transitionT5 = transitionBasis.attr({
  '.label': {
    text: 'T5'
  },
  '.label-time': {
    text: 't = 0'
  },
  '.label-base': {
    text: 'b = 0'
  }
}).position(800, 50).clone();

export let transitionT1 = transitionBasis.attr({
  '.label': {
    text: 'T1'
  },
  '.label-time': {
    text: 't = 30'
  },
  '.label-base': {
    text: 'b = 0'
  }
}).position(350, 150).clone();

export let transitionT2 = transitionBasis.attr({
  '.label': {
    text: 'T2'
  },
  '.label-time': {
    text: 't = 30'
  },
  '.label-base': {
    text: 'b = 0'
  }
}).position(300, 250).clone();

export let transitionT4 = transitionBasis.attr({
  '.label': {
    text: 'T4'
  },
  '.label-time': {
    text: 't = 0'
  },
  '.label-base': {
    text: 'b = 0'
  }
}).position(700, 250).clone();

export let transitionT7 = transitionBasis.attr({
  '.label': {
    text: 'T7'
  },
  '.label-time': {
    text: 't = 30'
  },
  '.label-base': {
    text: 'b = 0'
  }
}).position(350, 350).clone();

export let transitionT8 = transitionBasis.attr({
  '.label': {
    text: 'T8'
  },
  '.label-time': {
    text: 't = 1'
  },
  '.label-base': {
    text: 'b = 0'
  }
}).position(350, 550).clone();

export let transitionT6 = transitionBasis.attr({
  '.label': {
    text: 'T6'
  },
  '.label-time': {
    text: 't = 30'
  },
  '.label-base': {
    text: 'b = 0'
  }
}).position(180, 450).clone();
