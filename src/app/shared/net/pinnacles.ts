import * as joint from 'jointjs';

const pinnacle = new joint.shapes.pn.Place({
  position: {
    x: 200,
    y: 50
  },
  attrs: {
    '.label': {
      text: 'Consumer',
      fill: '#7c68fc'
    },
    '.root' : {
      stroke: '#9586fd',
      'stroke-width': 3
    },
    '.tokens > circle': {
      fill : '#7a7e9b'
    }
  },
  tokens: 1
});

export let pinnacleConsumer = pinnacle.attr({
  '.label': {
    text: 'Consumer'
  }
})
.position(200, 50)
.set('tokens', 1)
.clone() as joint.dia.Cell;

export let pinnacleNeeds = pinnacle.attr({
  '.label': {
    text: 'Needs'
  }
})
.position(600, 50)
.set('tokens', 0)
.clone() as joint.dia.Cell;

export let pinnacleConsumedSolarEnergy = pinnacle.attr({
  '.label': {
    text: 'Consumed Solar Energy SE'
  }
})
.position(950, 50)
.set('tokens', 0)
.clone() as joint.dia.Cell;

export let pinnacleSolarStation = pinnacle.attr({
  '.label': {
    text: 'Solar Station'
  }
})
.position(150, 150)
.set('tokens', 1)
.clone() as joint.dia.Cell;

export let pinnacleElectroStation = pinnacle.attr({
  '.label': {
    text: 'Electro Station'
  }
})
.position(100, 250)
.set('tokens', 1)
.clone() as joint.dia.Cell;

export let pinnacleElectroEnergy = pinnacle.attr({
  '.label': {
    text: 'Electro Energy'
  }
})
.position(500, 250)
.set('tokens', 0)
.clone() as joint.dia.Cell;

export let pinnacleConsumedElectroEnergy = pinnacle.attr({
  '.label': {
    text: 'Consumed Electro Energy EE'
  }
})
.position(900, 250)
.set('tokens', 0)
.clone() as joint.dia.Cell;

export let pinnacleSolarEnergy = pinnacle.attr({
  '.label': {
    text: 'Solar Energy'
  }
})
.position(550, 350)
.set('tokens', 0)
.clone() as joint.dia.Cell;

export let pinnacleSoldSolarEnergy = pinnacle.attr({
  '.label': {
    text: 'Sold Solar Energy SE'
  }
})
.position(500, 450)
.set('tokens', 0)
.clone() as joint.dia.Cell;

export let pinnacleP7 = pinnacle.attr({
  '.label': {
    text: 'P7'
  }
})
.position(450, 550)
.set('tokens', 0)
.clone() as joint.dia.Cell;

export let pinnacleP5 = pinnacle.attr({
  '.label': {
    text: 'P5'
  }
})
.position(250, 450)
.set('tokens', 0)
.clone() as joint.dia.Cell;

export let pinnacleSellingSolarEnergy = pinnacle.attr({
  '.label': {
    text: 'Selling Solar Energy SE'
  }
})
.position(60, 450)
.set('tokens', 1)
.clone() as joint.dia.Cell;
