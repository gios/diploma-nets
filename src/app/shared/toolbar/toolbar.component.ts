import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { IInputButtons } from './toolbar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() buttons: IInputButtons;

  constructor(
    private router: Router
  ) { }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
