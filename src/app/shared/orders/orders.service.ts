import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { select, Store } from '@ngrx/store';
import { Observable, of, take, tap } from 'rxjs';
import { AppState } from '../../store/app.state';
import { setOrders } from '../../store/ordersState/orders.actions';
import { Order, OrderDetailsItem } from './order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  public actualDate: string;

  constructor(
    private fireStore: AngularFirestore,
    private ngrxStore: Store<AppState>
  ) {
    this.actualDate = this.formatDate(new Date());
  }

  private padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  private formatDate(date: Date) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('-');
  }

  public getTodayOrders$(): Observable<Order[]> {
    return this.fireStore
      .collection<Order>('orders', (ref) =>
        ref.where('dateOfOrder', '==', this.actualDate)
      )
      .valueChanges()
      .pipe(
        tap((result) => {
          this.ngrxStore.dispatch(setOrders({ todayOrders: result }));
        })
      );
  }

  // public getSummedTodayOrders(orders: Order[]) {
  //   const results: any = {};
  //   orders.forEach((order) => {
  //     const { flavour, unit, quantity } = order.orderDetails[0];
  //     const id = `${flavour}-${unit}`;
  //     if (results[id]) {
  //       results[id] = results[id] + quantity;
  //     } else {
  //       results[id] = quantity;
  //     }
  //   });
  //   console.log(results);
  //   return results;
  // }

  public getSummedTodayOrders(orders: Order[]) {
    const results: any = {};
    orders.forEach(({ orderDetails }) => {
      orderDetails.forEach((orderItem) => {
        const id = orderItem.flavour;
        if (results[id]) {
          results[id] = results[id] + +orderItem.unit * +orderItem.quantity;
        } else {
          results[id] = +orderItem.quantity * +orderItem.unit;
        }
      });
    });
    console.log(results);
    return results;
  }
}
