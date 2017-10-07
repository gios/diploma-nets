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
      this.navPinnacles = changes.data.currentValue.pinnacles as IPinnacle[];
      this.navTransitions = changes.data.currentValue.transitions as ITransition[];
      this.navConnections = changes.data.currentValue.connections as ILinkConnection[];
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
