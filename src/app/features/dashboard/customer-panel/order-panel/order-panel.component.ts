import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'unicorn-order-panel',
  templateUrl: './order-panel.component.html',
  styleUrls: ['./order-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
