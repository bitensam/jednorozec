import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';
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
  private cart: BehaviorSubject<Order | null> =
    new BehaviorSubject<Order | null>(null);

  public readonly orderForm: FormGroup = this.fb.group({
    flavour: ['', { validators: [Validators.required, Validators.max(1)] }],
    quantity: [1, { validators: [Validators.required, Validators.max(30)] }],
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
    return this.ngrxStore.select(({ orders }) => {
      console.log(orders.tempOrders);
      return orders.tempOrders;
    });
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

  public completeOrder(): Order {
    let currentDate: string = this.ordersService.actualDate;
    let orderItemsFromCart: OrderDetailsItem[] = [];
    let customerEmail: string = '';

    this.ngrxStore
      .pipe(select('orders'), take(1))
      .subscribe(({ tempOrders }) => {
        orderItemsFromCart = [...tempOrders];
      });

    this.ngrxStore.pipe(select('user'), take(1)).subscribe(({ userLogged }) => {
      customerEmail = userLogged!.email;
    });

    console.log(orderItemsFromCart);
    console.log(customerEmail);
    console.log(currentDate);
    return {
      dateOfOrder: currentDate,
      customerEmail: customerEmail,
      orderDetails: orderItemsFromCart,
    };
  }

  public submitOrder() {
    const newOrder = this.completeOrder();

    const ordersCollection = this.fireStore.collection<Order>('orders');

    ordersCollection.add(newOrder);
  }
}
