import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatSidenavModule, MatButtonModule, MatIconModule, MatToolbarModule, MatTabsModule, MatExpansionModule,
  MatInputModule, MatDialogModule, MatProgressSpinnerModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { NetComponent } from './net/net.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ConstructSidenavComponent } from './construct-sidenav/construct-sidenav.component';
import { PinnacleModalComponent } from './construct-sidenav/modals/pinnacle-modal/pinnacle-modal.component';
import { TransitionModalComponent } from './construct-sidenav/modals/transition-modal/transition-modal.component';

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
    MatDialogModule,
    MatProgressSpinnerModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    NetComponent,
    SidenavComponent,
    ToolbarComponent,
    ConstructSidenavComponent,
    PinnacleModalComponent,
    TransitionModalComponent
  ],
  exports: [
    NetComponent,
    SidenavComponent,
    ToolbarComponent,
    ConstructSidenavComponent
  ],
  entryComponents: [
    PinnacleModalComponent,
    TransitionModalComponent
  ]
})
export class SharedModule { }
