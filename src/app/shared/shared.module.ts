import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule, MatButtonModule, MatIconModule, MatToolbarModule, MatTabsModule, MatExpansionModule,
  MatInputModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { NetComponent } from './net/net.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ConstructSidenavComponent } from './construct-sidenav/construct-sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatExpansionModule,
    MatInputModule,
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
