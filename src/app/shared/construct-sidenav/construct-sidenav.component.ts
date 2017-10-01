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
  navPinnacles: joint.dia.Cell[] = [];
  navTransitions: joint.dia.Cell[] = [];
  navConnections: joint.shapes.pn.Link[] = [];
  @Input() data: INetAttributes;

  constructor(
    private netService: NetService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue) {
      const pinnacles = changes.data.currentValue.pinnacles as IPinnacle[];
      const transitions = changes.data.currentValue.transitions as ITransition[];
      const connections = changes.data.currentValue.connections as ILinkConnection[];
      this.navPinnacles = this.netService.getGeneratedPinnacles(pinnacles);
      this.navTransitions = this.netService.getGeneratedTransitions(transitions);
      this.navConnections = this.netService.getGeneratedConnections(this.navPinnacles, this.navTransitions, connections);
      const netEntities = this.navPinnacles.concat(this.navTransitions);
      this.navConnections.forEach(value => {
        const source = value.get('source');
        const target = value.get('target');
        value.set('sourceItem', find(netEntities, ['id', source.id]));
        value.set('targetItem', find(netEntities, ['id', target.id]));
      });
    }
  }
}
