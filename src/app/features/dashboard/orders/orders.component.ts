import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/orders/order.interface';
import { OrdersService } from 'src/app/shared/orders/orders.service';

@Component({
  selector: 'unicorn-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
  public orders$: Observable<Order[]> = this.ordersService.getTodayOrders$();
  // sorki Kamil - nie umiałem inaczej :((
  public summedOrders: [string, unknown][] = [];
  public displayedColumns: string[] = ['flavour', 'value'];

  public sum(orders: Order[]) {
    this.summedOrders = this.ordersService.getSummedTodayOrders(orders);
  }

  constructor(private ordersService: OrdersService) {}
}
