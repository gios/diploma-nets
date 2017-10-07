import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import * as joint from 'jointjs';
import { find } from 'lodash';

import { INetAttributes, IPinnacle, ITransition, ILinkConnection } from '../net/net.interface';
import { NetService } from '../net/net.service';

@Component({
  selector: 'app-construct-sidenav',
  templateUrl: './construct-sidenav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./construct-sidenav.component.scss'],
  providers: [NetService]
})
export class ConstructSidenavComponent implements OnChanges {
  navPinnacles: IPinnacle[] = [];
  navTransitions: ITransition[] = [];
  navConnections: ILinkConnection[] = [];
  @Input() data: INetAttributes;

  constructor(
    private netService: NetService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue) {
      const pinnacles = changes.data.currentValue.pinnacles as IPinnacle[];
      const transitions = changes.data.currentValue.transitions as ITransition[];
      const connections = changes.data.currentValue.connections as ILinkConnection[];
      const generatedPinnacles = this.netService.getGeneratedPinnacles(pinnacles);
      const generatedTransitions = this.netService.getGeneratedTransitions(transitions);
      const generatedConnections = this.netService.getGeneratedConnections(generatedPinnacles, generatedTransitions, connections);
      const netEntities = generatedPinnacles.concat(generatedTransitions);
      generatedConnections.forEach(value => {
        const source = value.get('source');
        const target = value.get('target');
        value.set('sourceItem', find(netEntities, ['id', source.id]));
        value.set('targetItem', find(netEntities, ['id', target.id]));
      });

      generatedPinnacles.forEach(pinnacle => {
        this.navPinnacles.push({
          id: pinnacle.get('baseId'),
          name: pinnacle.get('baseName'),
          value: pinnacle.get('tokens'),
          x: pinnacle.get('position').x,
          y: pinnacle.get('position').y
        });
      });

      generatedTransitions.forEach(transition => {
        this.navTransitions.push({
          id: transition.get('baseId'),
          name: transition.get('baseName'),
          time: transition.attr('.label-time/text').split(' ')[2],
          x: transition.get('position').x,
          y: transition.get('position').y
        });
      });

      generatedConnections.forEach(connect => {
        this.navConnections.push({
          id: +connect.id,
          value: this.netService.getLinkValue(connect),
          connect: [{
            type: connect.get('sourceItem').get('connectionType'),
            name: connect.get('sourceItem').get('baseName')
          }, {
            type: connect.get('targetItem').get('connectionType'),
            name: connect.get('targetItem').get('baseName')
          }]
        });
      });
    }
  }

  create(type: string) {
    switch (type) {
      case 'pinnacle':
        console.log('pinnacle create');
        break;
      case 'transition':
        console.log('transition create');
        break;
      case 'connection':
        console.log('connection create');
        break;

      default:
        console.log('default create');
        break;
    }
  }
}
