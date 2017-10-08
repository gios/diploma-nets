import {
  Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef,
  Output, EventEmitter
} from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import * as joint from 'jointjs';
import { Subscription } from 'rxjs/Rx';
import { remove } from 'lodash';

import { INetAttributes, IPinnacle, ITransition, ILinkConnection } from '../net/net.interface';
import { NetService } from '../net/net.service';
import { HttpService } from '../../http.service';
import { PinnacleModalComponent } from './modals/pinnacle-modal/pinnacle-modal.component';
import { TransitionModalComponent } from './modals/transition-modal/transition-modal.component';
import { ConnectionModalComponent } from './modals/connection-modal/connection-modal.component';

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
  selectedTabIndex: number;
  private pinnacleModal$: Subscription;
  private transitionModal$: Subscription;
  private connectionModal$: Subscription;
  private deletePinnacle$: Subscription;
  private deleteTransition$: Subscription;
  private deleteConnection$: Subscription;
  @Input() data: INetAttributes;
  @Output() changeNet = new EventEmitter<INetAttributes>();

  constructor(
    private netService: NetService,
    private dialog: MatDialog,
    private http: HttpService,
    private snackBar: MatSnackBar,
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

    if (this.transitionModal$) {
      this.transitionModal$.unsubscribe();
    }

    if (this.connectionModal$) {
      this.connectionModal$.unsubscribe();
    }

    if (this.deletePinnacle$) {
      this.deletePinnacle$.unsubscribe();
    }

    if (this.deleteTransition$) {
      this.deleteTransition$.unsubscribe();
    }

    if (this.deleteConnection$) {
      this.deleteConnection$.unsubscribe();
    }
  }

  create(type: string) {
    switch (type) {
      case 'pinnacle':
        this.pinnacleModal$ = this.dialog.open(PinnacleModalComponent, {
          width: '400px'
        })
          .afterClosed().subscribe(result => {
            if (result) {
              this.navPinnacles.push(result);
              this.changeDetectorRef.markForCheck();
              this.updateNet();
            }
          }, (err) => {
            const errData = err.json();
            this.openSnackBar(errData.message);
          });
        break;
      case 'transition':
        this.transitionModal$ = this.dialog.open(TransitionModalComponent, {
          width: '400px'
        })
          .afterClosed().subscribe(result => {
            if (result) {
              this.navTransitions.push(result);
              this.changeDetectorRef.markForCheck();
              this.updateNet();
            }
          }, (err) => {
            const errData = err.json();
            this.openSnackBar(errData.message);
          });
        break;
      case 'connection':
        this.connectionModal$ = this.dialog.open(ConnectionModalComponent, {
          width: '400px',
          data: { entities: this.navPinnacles.concat(this.navTransitions as any) }
        })
          .afterClosed().subscribe(result => {
            if (result) {
              this.navConnections.push(result);
              this.changeDetectorRef.markForCheck();
              this.updateNet();
            }
          }, (err) => {
            const errData = err.json();
            this.openSnackBar(errData.message);
          });
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
        this.deletePinnacle$ = this.http.delete(`api/net/pinnacle/${id}`)
          .subscribe(data => {
            const response = data.json();
            remove(this.navPinnacles, item => item.id === id);
            this.changeDetectorRef.markForCheck();
            this.updateNet();
            this.openSnackBar(response.message);
          }, (err) => {
            const errData = err.json();
            this.openSnackBar(errData.message);
          });
        break;
      case 'transition':
        this.deleteTransition$ = this.http.delete(`api/net/transition/${id}`)
          .subscribe(data => {
            const response = data.json();
            remove(this.navTransitions, item => item.id === id);
            this.changeDetectorRef.markForCheck();
            this.updateNet();
            this.openSnackBar(response.message);
          }, (err) => {
            const errData = err.json();
            this.openSnackBar(errData.message);
          });
        break;
      case 'connection':
        this.deleteConnection$ = this.http.delete(`api/net/connection/${id}`)
          .subscribe(data => {
            const response = data.json();
            remove(this.navConnections, item => item.id === id);
            this.changeDetectorRef.markForCheck();
            this.updateNet();
            this.openSnackBar(response.message);
          }, (err) => {
            const errData = err.json();
            this.openSnackBar(errData.message);
          });
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

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close');
  }
}
