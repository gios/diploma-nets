import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetComponent } from './net/net.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [
    CommonModule
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
