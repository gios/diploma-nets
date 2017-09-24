import * as joint from 'jointjs';

export function getTimeTransition(transitionModel: joint.shapes.pn.Transition) {
  return +transitionModel.attr('.label-time/text').split(' ')[2];
}

export function setTimeTransition(transitionModel: joint.shapes.pn.Transition, time: string | number) {
  transitionModel.attr('.label-time/text', `t = ${time}`);
}

const transitionBasis = new joint.shapes.pn.Transition({
  markup: `<g class="rotatable"><g class="scalable"><rect class="root"/></g></g>
  <text class="label"/><text class="label-time"/>`,
  position: {
    x: 400,
    y: 50
  },
  attrs: {
    '.label': {
      text: 'T3',
      fill: '#8a083e',
      'font-weight': 'bold'
    },
    '.label-time': {
      'text-anchor': 'middle',
      'ref-x': .5,
      'ref-y': 55,
      ref: 'rect',
      'font-size': 12,
      text: `t = 30`,
      fill: '#8a083e',
      'font-weight': 'bold'
    },
    '.root' : {
      fill: '#fac200',
      stroke: '#fac200'
    }
  }
});

export const IT1 = transitionBasis.attr({
  '.label': {
    text: 'IT 1'
  },
  '.label-time': {
    text: 't = 3'
  }
}).position(300, 100).clone();


export const IT2 = transitionBasis.attr({
  '.label': {
    text: 'IT 2'
  },
  '.label-time': {
    text: 't = 12'
  }
}).position(300, 200).clone();

export const IT3 = transitionBasis.attr({
  '.label': {
    text: 'IT 33'
  },
  '.label-time': {
    text: 't = 66'
  }
}).position(300, 300).clone();

export const IT4 = transitionBasis.attr({
  '.label': {
    text: 'IT 4'
  },
  '.label-time': {
    text: 't = 22'
  }
}).position(300, 400).clone();

export const IT5 = transitionBasis.attr({
  '.label': {
    text: 'IT 5'
  },
  '.label-time': {
    text: 't = 77'
  }
}).position(300, 500).clone();

export const IT6 = transitionBasis.attr({
  '.label': {
    text: 'IT 6'
  },
  '.label-time': {
    text: 't = 10'
  }
}).position(300, 600).clone();

export const CT1 = transitionBasis.attr({
  '.label': {
    text: 'CT 1'
  },
  '.label-time': {
    text: 't = 13'
  }
}).position(700, 200).clone();

export const CT2 = transitionBasis.attr({
  '.label': {
    text: 'CT 2'
  },
  '.label-time': {
    text: 't = 13'
  }
}).position(700, 350).clone();

export const CT3 = transitionBasis.attr({
  '.label': {
    text: 'CT 3'
  },
  '.label-time': {
    text: 't = 8'
  }
}).position(700, 500).clone();

export const PT1 = transitionBasis.attr({
  '.label': {
    text: 'PT 1'
  },
  '.label-time': {
    text: 't = 30'
  }
}).position(1100, 100).clone();

export const PT2 = transitionBasis.attr({
  '.label': {
    text: 'PT 2'
  },
  '.label-time': {
    text: 't = 30'
  }
}).position(1100, 250).clone();

export const PT3 = transitionBasis.attr({
  '.label': {
    text: 'PT 3'
  },
  '.label-time': {
    text: 't = 30'
  }
}).position(1100, 400).clone();

export const PT4 = transitionBasis.attr({
  '.label': {
    text: 'PT 4'
  },
  '.label-time': {
    text: 't = 30'
  }
}).position(1100, 550).clone();

export const RT1 = transitionBasis.attr({
  '.label': {
    text: 'RT 1'
  },
  '.label-time': {
    text: 't = 30'
  }
}).position(1100, 700).clone();

export const RT2 = transitionBasis.attr({
  '.label': {
    text: 'RT 2'
  },
  '.label-time': {
    text: 't = 30'
  }
}).position(1100, 850).clone();

export const RT3 = transitionBasis.attr({
  '.label': {
    text: 'RT 3'
  },
  '.label-time': {
    text: 't = 30'
  }
}).position(1100, 1000).clone();
