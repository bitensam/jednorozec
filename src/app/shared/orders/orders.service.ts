import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { select, Store } from '@ngrx/store';
import { Observable, take, tap } from 'rxjs';
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

  private getTodayOrdersValue(): Order[] {
    let stateValue: Order[] = [];

    this.ngrxStore
      .pipe(select('orders'), take(1))
      .subscribe(({ todayOrders }) => {
        stateValue = todayOrders;
      });

    return stateValue;
  }

  // public getSummedTodayOrders() {
  //   const todayOrders = this.getTodayOrdersValue();

  //   const helper: any = {};

  //   todayOrders.forEach(({ orderDetails }) => {
  //     orderDetails.forEach((item) => {
  //       helper[`${item.flavour.toLowerCase()}-${item.unit.toLowerCase()}`] +=
  //         item.quantity;
  //       console.log(helper);
  //     });
  //   });

  //   const result = todayOrders.forEach(({ orderDetails }) => {
  //     Object.values(
  //       orderDetails.reduce((r: any, e) => {
  //         const key = e.flavour + '-' + e.unit;
  //         if (!r[key]) r[key] = e;
  //         else {
  //           r[key].quantity += e.quantity;
  //         }

  //         return r;
  //       }, {})
  //     );
  //   });
  // }
}
