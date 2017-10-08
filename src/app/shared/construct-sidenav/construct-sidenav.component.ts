import {
  Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef,
  Output, EventEmitter
} from '@angular/core';
import { MatDialog } from '@angular/material';
import * as joint from 'jointjs';
import { Subscription } from 'rxjs/Rx';

import { INetAttributes, IPinnacle, ITransition, ILinkConnection } from '../net/net.interface';
import { NetService } from '../net/net.service';
import { PinnacleModalComponent } from './modals/pinnacle-modal/pinnacle-modal.component';
import { TransitionModalComponent } from './modals/transition-modal/transition-modal.component';

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
  private transitionModal$: Subscription;
  @Input() data: INetAttributes;
  @Output() changeNet = new EventEmitter<INetAttributes>();

  constructor(
    private netService: NetService,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
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
            if (result) {
              this.navPinnacles.push(result);
              this.changeDetectorRef.markForCheck();
              this.updateNet();
            }
          });
        break;
      case 'transition':
        this.transitionModal$ = this.dialog.open(TransitionModalComponent)
          .afterClosed().subscribe(result => {
            if (result) {
              this.navTransitions.push(result);
              this.changeDetectorRef.markForCheck();
              this.updateNet();
            }
          });
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

  private updateNet() {
    this.changeNet.emit({
      pinnacles: this.navPinnacles,
      transitions: this.navTransitions,
      connections: this.navConnections
    });
  }
}
