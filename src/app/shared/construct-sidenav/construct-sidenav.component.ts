import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as joint from 'jointjs';

import { INetAttributes, IPinnacle, ITransition } from '../net/net.interface';
import { NetService } from '../net/net.service';

@Component({
  selector: 'app-construct-sidenav',
  templateUrl: './construct-sidenav.component.html',
  styleUrls: ['./construct-sidenav.component.scss'],
  providers: [NetService]
})
export class ConstructSidenavComponent implements OnChanges {
  navPinnacles: joint.dia.Cell[] = [];
  navTransitions: joint.dia.Cell[] = [];
  @Input() data: INetAttributes;

  constructor(
    private netService: NetService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue) {
      const pinnacles = changes.data.currentValue.pinnacles as IPinnacle[];
      const transitions = changes.data.currentValue.transitions as ITransition[];
      this.navPinnacles = this.netService.getGeneratedPinnacles(pinnacles);
      this.navTransitions = this.netService.getGeneratedTransitions(transitions);
    }
  }
}
