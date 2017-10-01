import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdSidenavModule, MdButtonModule, MdIconModule, MdToolbarModule, MdTabsModule, MdExpansionModule,
  MdInputModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { NetComponent } from './net/net.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ConstructSidenavComponent } from './construct-sidenav/construct-sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    MdSidenavModule,
    MdButtonModule,
    MdIconModule,
    MdToolbarModule,
    MdTabsModule,
    MdExpansionModule,
    MdInputModule,
    RouterModule
  ],
  declarations: [
    NetComponent,
    SidenavComponent,
    ToolbarComponent,
    ConstructSidenavComponent
  ],
  exports: [
    NetComponent,
    SidenavComponent,
    ToolbarComponent,
    ConstructSidenavComponent
  ]
})
export class SharedModule { }
