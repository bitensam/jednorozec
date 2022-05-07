import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { setOrders } from 'src/app/store/ordersState/orders.actions';
import { Order } from './order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private ordersCollection: AngularFirestoreCollection<Order> =
    this.fireStore.collection<Order>('orders');

  public actualDate: string;

  constructor(
    private fireStore: AngularFirestore,
    private ngrxStore: Store<AppState>
  ) {
    this.actualDate = this.formatDate(new Date());
    console.log(this.actualDate);
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
}
