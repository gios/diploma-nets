import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { IInputButtons } from './toolbar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() buttons: IInputButtons;

  constructor() { }

  ngOnInit() {
  }

}
