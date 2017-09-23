import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule } from '@angular/material';

import { NetComponent } from './net/net.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule
  ],
  declarations: [
    NetComponent,
    SidenavComponent
  ],
  exports: [
    NetComponent,
    SidenavComponent
  ]
})
export class SharedModule { }
