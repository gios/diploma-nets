import * as joint from 'jointjs';

const pinnacle = new joint.shapes.pn.Place({
  position: {
    x: 200,
    y: 50
  },
  attrs: {
    '.label': {
      text: 'Consumer',
      fill: '#be0037',
      'font-weight': 'bold'
    },
    '.root' : {
      stroke: '#fac200',
      'stroke-width': 3
    },
    '.tokens > circle': {
      fill : '#fac200'
    }
  },
  tokens: 1
});

export const Ingredient1 = pinnacle.attr({
  '.label': {
    text: 'Ingredient1'
  }
})
.position(100, 100)
.set('tokens', 1)
.clone() as joint.dia.Cell;

export const Ingredient2 = pinnacle.attr({
  '.label': {
    text: 'Ingredient2'
  }
})
.position(100, 200)
.set('tokens', 1)
.clone() as joint.dia.Cell;

export const Ingredient3 = pinnacle.attr({
  '.label': {
    text: 'Ingredient3'
  }
})
.position(100, 300)
.set('tokens', 1)
.clone() as joint.dia.Cell;

export const Ingredient4 = pinnacle.attr({
  '.label': {
    text: 'Ingredient4'
  }
})
.position(100, 400)
.set('tokens', 1)
.clone() as joint.dia.Cell;

export const Ingredient5 = pinnacle.attr({
  '.label': {
    text: 'Ingredient5'
  }
})
.position(100, 500)
.set('tokens', 1)
.clone() as joint.dia.Cell;

export const Ingredient6 = pinnacle.attr({
  '.label': {
    text: 'Ingredient6'
  }
})
.position(100, 600)
.set('tokens', 1)
.clone() as joint.dia.Cell;

export const Construction1 = pinnacle.attr({
  '.label': {
    text: 'Construction1'
  }
})
.position(500, 200)
.set('tokens', 0)
.clone() as joint.dia.Cell;

export const Construction2 = pinnacle.attr({
  '.label': {
    text: 'Construction2'
  }
})
.position(500, 350)
.set('tokens', 0)
.clone() as joint.dia.Cell;

export const Construction3 = pinnacle.attr({
  '.label': {
    text: 'Construction3'
  }
})
.position(500, 500)
.set('tokens', 0)
.clone() as joint.dia.Cell;

export const Product1 = pinnacle.attr({
  '.label': {
    text: 'Product1'
  }
})
.position(850, 200)
.set('tokens', 0)
.clone() as joint.dia.Cell;

export const Product2 = pinnacle.attr({
  '.label': {
    text: 'Product2'
  }
})
.position(850, 350)
.set('tokens', 0)
.clone() as joint.dia.Cell;

export const Product3 = pinnacle.attr({
  '.label': {
    text: 'Product2'
  }
})
.position(850, 500)
.set('tokens', 0)
.clone() as joint.dia.Cell;
