import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, switchMap, take, tap } from 'rxjs';
import { OrderDetailsItem } from 'src/app/shared/orders/order.interface';
import { OrdersService } from 'src/app/shared/orders/orders.service';
import { AppState } from 'src/app/store/app.state';
import {
  setTempOrderFromLast,
  setTempOrders,
} from 'src/app/store/ordersState/orders.actions';
import { Order } from '../../../../shared/orders/order.interface';

@Injectable()
export class OrderFormService {
  public readonly orderForm: FormGroup = this.fb.group({
    flavour: ['', { validators: [Validators.required, Validators.max(1)] }],
    quantity: [1, { validators: [Validators.required, Validators.min(30)] }],
    unit: ['box 1L', { validators: [Validators.required] }],
  });

  constructor(
    private fb: FormBuilder,
    private ngrxStore: Store<AppState>,
    private ordersService: OrdersService,
    private fireStore: AngularFirestore
  ) {}

  // TO DO refactor nazw
  public addOrderItemToCart(order: OrderDetailsItem) {
    this.ngrxStore.dispatch(setTempOrders({ tempOrder: order }));
  }

  public getOrderItemsFromCart$(): Observable<OrderDetailsItem[]> {
    return this.ngrxStore.select(({ orders }) => orders.tempOrders);
  }

  public addLastOrderToCart() {
    this.ngrxStore
      .select(({ orders }) => orders.lastOrder)
      .pipe(take(1))
      .subscribe((order) => {
        this.ngrxStore.dispatch(setTempOrderFromLast({ tempLastOrder: order }));
      });
  }

  // TO DO !
  // public submitOrder() {
  //   const order: Order = {
  //     dateOfOrder: this.ordersService.actualDate,
  //     customerEmail: this.ngrxStore
  //       .select(({ user }) => user.userLogged?.email)
  //       .pipe(take(1))
  //       .subscribe((user) => {
  //         user;
  //       }),
  //     orderDetails: this.getOrderItemsFromCart$()
  //       .pipe(take(1))
  //       .subscribe((order) => order),
  //   };

  //   const ordersRef: AngularFirestoreDocument<Order> = this.fireStore.doc(
  //     `users/${user.uid}`
  //   );
  // }
}
