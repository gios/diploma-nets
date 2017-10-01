import { Component, Input, OnInit } from '@angular/core';

import { INetAttributes } from '../net/net.interface';
import { NetService } from '../net/net.service';

@Component({
  selector: 'app-construct-sidenav',
  templateUrl: './construct-sidenav.component.html',
  styleUrls: ['./construct-sidenav.component.scss'],
  providers: [NetService]
})
export class ConstructSidenavComponent implements OnInit {
  @Input() data: INetAttributes;

  constructor(
    private netService: NetService
  ) {}

  ngOnInit() {
    // Transform data for representation
  }
}
