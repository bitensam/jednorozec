import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { OrderDetailsItem } from 'src/app/shared/orders/order.interface';
import { OrdersService } from 'src/app/shared/orders/orders.service';
import { AppState } from 'src/app/store/app.state';
import {
  setTempOrderFromLast,
  setTempOrders,
} from 'src/app/store/ordersState/orders.actions';
import { Order } from '../../../../shared/orders/order.interface';
import { updateDoc, doc, getFirestore, arrayUnion } from 'firebase/firestore';

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

  public completeOrder(
    itemsFromCart: OrderDetailsItem[],
    userEmail: string
  ): Order {
    const currentDate: string = this.ordersService.actualDate;
    const orderItemsFromCart: OrderDetailsItem[] = itemsFromCart;
    const customerEmail: string = userEmail;

    return {
      dateOfOrder: currentDate,
      customerEmail: customerEmail,
      orderDetails: orderItemsFromCart,
    };
  }

  public submitOrder(
    itemsFromCart: OrderDetailsItem[],
    userUid: string,
    userEmail: string
  ) {
    const newOrder = this.completeOrder(itemsFromCart, userEmail);

    const ordersCollection = this.fireStore.collection<Order>('orders');

    const clientRef = doc(getFirestore(), `users/${userUid}`);

    updateDoc(clientRef, {
      lastOrderDetails: newOrder.orderDetails,
      lastOrderDate: newOrder.dateOfOrder,
    });

    ordersCollection.add(newOrder);
  }
}
