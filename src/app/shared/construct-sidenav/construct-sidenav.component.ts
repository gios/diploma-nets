import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as joint from 'jointjs';
import { find } from 'lodash';
import { Subscription } from 'rxjs/Rx';

import { INetAttributes, IPinnacle, ITransition, ILinkConnection } from '../net/net.interface';
import { NetService } from '../net/net.service';
import { PinnacleModalComponent } from './modals/pinnacle-modal/pinnacle-modal.component';

@Component({
  selector: 'app-construct-sidenav',
  templateUrl: './construct-sidenav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./construct-sidenav.component.scss'],
  providers: [NetService]
})
export class ConstructSidenavComponent implements OnChanges, OnDestroy {
  navPinnacles: IPinnacle[] = [];
  navTransitions: ITransition[] = [];
  navConnections: ILinkConnection[] = [];
  private pinnacleModal$: Subscription;
  @Input() data: INetAttributes;

  constructor(
    private netService: NetService,
    private dialog: MatDialog
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue) {
      this.navPinnacles = changes.data.currentValue.pinnacles as IPinnacle[];
      this.navTransitions = changes.data.currentValue.transitions as ITransition[];
      this.navConnections = changes.data.currentValue.connections as ILinkConnection[];
    }
  }

  ngOnDestroy() {
    if (this.pinnacleModal$) {
      this.pinnacleModal$.unsubscribe();
    }
  }

  create(type: string) {
    switch (type) {
      case 'pinnacle':
        this.pinnacleModal$ = this.dialog.open(PinnacleModalComponent)
          .afterClosed().subscribe(result => {
            this.navPinnacles.push(result);
            console.log('The dialog was closed', result);
          });
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

  delete(event: Event, type: string, id: number) {
    event.stopPropagation();
    switch (type) {
      case 'pinnacle':
        console.log('pinnacle delete', id);
        break;
      case 'transition':
        console.log('transition delete', id);
        break;
      case 'connection':
        console.log('connection delete', id);
        break;

      default:
        console.log('default delete', id);
        break;
    }
  }
}
