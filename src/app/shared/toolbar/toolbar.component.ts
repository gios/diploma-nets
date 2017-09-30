import { Component, Input } from '@angular/core';
import { IInputButtons } from './toolbar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() buttons: IInputButtons;

  constructor() { }

}
