import { Component, SimpleChanges, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

import { IInputButtons } from '../shared/toolbar/toolbar';
import { INetAttributes } from '../shared/net/net.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../app.component.scss']
})
export class HomeComponent implements OnInit {
  netData: INetAttributes;
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
      disabled: true,
      type: 'warn',
      icon: 'cached',
      click: this.stopTransition.bind(this)
    }
  ];

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    this.http.get('api/net').subscribe(response => {
      const data = response.json();
      this.netData = data;
    }, (err) => console.error(err));
  }

  startTransition() {
    this.transitionState = true;
    this.toolbarButtons[0].disabled = true;
    this.toolbarButtons[1].disabled = false;
  }

  stopTransition() {
    this.transitionState = false;
    this.toolbarButtons[0].disabled = true;
    this.toolbarButtons[1].disabled = true;
  }

  transitionStopped() {
    this.toolbarButtons[0].disabled = false;
  }
}
