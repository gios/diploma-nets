import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { NetComponent } from './net/net.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    RouterModule
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
