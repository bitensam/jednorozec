import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'unicorn-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
