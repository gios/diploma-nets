import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as joint from 'jointjs';

import {
  pinnacleConsumer,
  pinnacleNeeds,
  pinnacleConsumedSolarEnergy,
  pinnacleSolarStation,
  pinnacleElectroStation,
  pinnacleElectroEnergy,
  pinnacleConsumedElectroEnergy,
  pinnacleSolarEnergy,
  pinnacleSoldSolarEnergy,
  pinnacleP7,
  pinnacleP5,
  pinnacleSellingSolarEnergy
} from './pinnacles';
import { link } from './linkConnections';
import {
  transitionT1,
  transitionT2,
  transitionT3,
  transitionT4,
  transitionT5,
  transitionT6,
  transitionT7,
  transitionT8
} from './transitions';
import { fireTransition } from './transitionAnimation';

@Component({
  selector: 'app-net',
  templateUrl: './net.component.html',
  styleUrls: ['./net.component.scss']
})
export class NetComponent implements OnInit {
  transitions: joint.dia.Cell[];
  pinnacles: joint.dia.Cell[];
  graph = new joint.dia.Graph();
  paper: joint.dia.Paper;

  @ViewChild('netSelector') netSelector: ElementRef;

  constructor() {
    this.transitions = [
      transitionT3,
      transitionT5,
      transitionT1,
      transitionT2,
      transitionT4,
      transitionT7,
      transitionT8,
      transitionT6
    ];

    this.pinnacles = [
      pinnacleConsumer,
      pinnacleNeeds,
      pinnacleConsumedSolarEnergy,
      pinnacleSolarStation,
      pinnacleElectroStation,
      pinnacleElectroEnergy,
      pinnacleConsumedElectroEnergy,
      pinnacleSolarEnergy,
      pinnacleSoldSolarEnergy,
      pinnacleP7,
      pinnacleP5,
      pinnacleSellingSolarEnergy
    ];
  }

  ngOnInit() {
    this.paper = new joint.dia.Paper({
      el: this.netSelector.nativeElement,
      width: 1050,
      height: 650,
      gridSize: 10,
      perpendicularLinks: true,
      interactive: false,
      model: this.graph
    });

    this.graph.addCell([
      ...this.pinnacles,
      ...this.transitions
    ]);

    this.graph.addCell([
      link(pinnacleConsumer, transitionT3),
      link(transitionT3, pinnacleConsumer),
      link(transitionT3, pinnacleNeeds, { label: '100' }),
      link(pinnacleNeeds, transitionT5),
      link(pinnacleNeeds, transitionT4),
      link(transitionT5, pinnacleConsumedSolarEnergy),
      link(pinnacleSolarStation, transitionT1),
      link(transitionT1, pinnacleSolarStation),
      link(transitionT1, pinnacleSolarEnergy, { label: '1200' }),
      link(pinnacleElectroStation, transitionT2),
      link(transitionT2, pinnacleElectroStation),
      link(transitionT2, pinnacleElectroEnergy, { label: '200' }),
      link(pinnacleElectroEnergy, transitionT4),
      link(transitionT4, pinnacleConsumedElectroEnergy),
      link(pinnacleSolarEnergy, transitionT7, { label: '1100' }),
      link(pinnacleSolarEnergy, transitionT5),
      link(transitionT7, pinnacleSoldSolarEnergy, { label: '1000' }),
      link(transitionT8, pinnacleP7),
      link(pinnacleP5, transitionT8),
      link(pinnacleP5, transitionT7),
      link(pinnacleSellingSolarEnergy, transitionT6),
      link(transitionT6, pinnacleSellingSolarEnergy),
      link(transitionT6, pinnacleP5)
    ]);
  }
}
