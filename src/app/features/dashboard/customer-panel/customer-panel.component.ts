import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'unicorn-user-panel',
  templateUrl: './customer-panel.component.html',
  styleUrls: ['./customer-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerPanelComponent {
  constructor() {}
}
