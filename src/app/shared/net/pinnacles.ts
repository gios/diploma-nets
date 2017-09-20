import * as joint from 'jointjs';

const pn = joint.shapes.pn;

const pinnacle = new pn.Place({
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

export let pinnacleConsumer = (pinnacle.clone().attr({
  '.label': {
    text: 'Consumer'
  }
}) as joint.shapes.pn.Place)
.position(200, 50)
.set('tokens', 1);

export let pinnacleNeeds = (pinnacle.clone().attr({
  '.label': {
    text: 'Needs'
  }
}) as joint.shapes.pn.Place)
.position(600, 50)
.set('tokens', 0);

export let pinnacleConsumedSolarEnergy = (pinnacle.clone().attr({
  '.label': {
    text: 'Consumed Solar Energy SE'
  }
}) as joint.shapes.pn.Place)
.position(950, 50)
.set('tokens', 0);

export let pinnacleSolarStation = (pinnacle.clone().attr({
  '.label': {
    text: 'Solar Station'
  }
}) as joint.shapes.pn.Place)
.position(150, 150)
.set('tokens', 1);

export let pinnacleElectroStation = (pinnacle.clone().attr({
  '.label': {
    text: 'Electro Station'
  }
}) as joint.shapes.pn.Place)
.position(100, 250)
.set('tokens', 1);

export let pinnacleElectroEnergy = (pinnacle.clone().attr({
  '.label': {
    text: 'Electro Energy'
  }
}) as joint.shapes.pn.Place)
.position(500, 250)
.set('tokens', 0);

export let pinnacleConsumedElectroEnergy = (pinnacle.clone().attr({
  '.label': {
    text: 'Consumed Electro Energy EE'
  }
}) as joint.shapes.pn.Place)
.position(900, 250)
.set('tokens', 0);

export let pinnacleSolarEnergy = (pinnacle.clone().attr({
  '.label': {
    text: 'Solar Energy'
  }
}) as joint.shapes.pn.Place)
.position(550, 350)
.set('tokens', 0);

export let pinnacleSoldSolarEnergy = (pinnacle.clone().attr({
  '.label': {
    text: 'Sold Solar Energy SE'
  }
}) as joint.shapes.pn.Place)
.position(500, 450)
.set('tokens', 0);

export let pinnacleP7 = (pinnacle.clone().attr({
  '.label': {
    text: 'P7'
  }
}) as joint.shapes.pn.Place)
.position(450, 550)
.set('tokens', 0);

export let pinnacleP5 = (pinnacle.clone().attr({
  '.label': {
    text: 'P5'
  }
}) as joint.shapes.pn.Place)
.position(250, 450)
.set('tokens', 0);

export let pinnacleSellingSolarEnergy = (pinnacle.clone().attr({
  '.label': {
    text: 'Selling Solar Energy SE'
  }
}) as joint.shapes.pn.Place)
.position(60, 450)
.set('tokens', 1);
