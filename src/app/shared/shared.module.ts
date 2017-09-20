import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetComponent } from './net/net.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NetComponent
  ],
  exports: [
    NetComponent
  ]
})
export class SharedModule { }
