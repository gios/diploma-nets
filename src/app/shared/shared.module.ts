import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdSidenavModule, MdButtonModule, MdIconModule, MdToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { NetComponent } from './net/net.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    MdSidenavModule,
    MdButtonModule,
    MdIconModule,
    MdToolbarModule,
    RouterModule
  ],
  declarations: [
    NetComponent,
    SidenavComponent,
    ToolbarComponent
  ],
  exports: [
    NetComponent,
    SidenavComponent,
    ToolbarComponent
  ]
})
export class SharedModule { }
