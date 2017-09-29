import { Component, OnInit } from '@angular/core';
import { IInputButtons } from '../shared/toolbar/toolbar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  transitionState: boolean;
  toolbarButtons: IInputButtons[] = [
    {
      text: 'Start Transition',
      disabled: false,
      type: 'primary',
      icon: null,
      click: this.startTransition.bind(this)
    },
    {
      text: 'Stop Transition',
      disabled: false,
      type: 'warn',
      icon: 'cached',
      click: this.stopTransition.bind(this)
    }
  ];

  constructor() { }

  ngOnInit() {

  }

  startTransition() {
    this.transitionState = true;
    this.toolbarButtons[0].disabled = true;
  }

  stopTransition() {
    this.transitionState = false;
    this.toolbarButtons[0].disabled = true;
    this.toolbarButtons[1].disabled = true;
  }
}
