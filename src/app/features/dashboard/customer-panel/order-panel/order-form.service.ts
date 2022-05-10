import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { OrderDetailsItem } from '../../../../shared/orders/order.interface';
import { OrdersService } from '../../../../shared/orders/orders.service';
import { AppState } from '../../../../store/app.state';
import {
  setTempOrderFromLast,
  setTempOrders,
} from '../../../../store/ordersState/orders.actions';
import { Order } from '../../../../shared/orders/order.interface';
import { updateDoc, doc, getFirestore } from 'firebase/firestore';
import { Router } from '@angular/router';
import { setUser } from 'src/app/store/userState/user.actions';
import { User } from 'src/app/shared/user/user.interface';

@Injectable()
export class OrderFormService {
  public readonly orderForm: FormGroup = this.fb.group({
    flavour: ['', { validators: [Validators.required, Validators.max(1)] }],
    quantity: [1, { validators: [Validators.required, Validators.max(30)] }],
    unit: ['', { validators: [Validators.required] }],
  });

  constructor(
    private fb: FormBuilder,
    private ngrxStore: Store<AppState>,
    private ordersService: OrdersService,
    private fireStore: AngularFirestore,
    private router: Router
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

  private checkIfUserCanOrder(currentDate: string, lastOrderDate: string) {
    return currentDate === lastOrderDate ? 'order disabled' : 'order active';
  }

  public submitOrder(itemsFromCart: OrderDetailsItem[], loggedUser: User) {
    const currentDate: string = this.ordersService.actualDate;
    const newOrder = this.completeOrder(itemsFromCart, loggedUser.email);
    const ordersCollection = this.fireStore.collection<Order>('orders');
    const clientRef = doc(getFirestore(), `users/${loggedUser.uid}`);

    // TO DO to debug

    if (
      this.checkIfUserCanOrder(currentDate, loggedUser.lastOrderDate!) ===
      'order disabled'
    ) {
      alert('Dziś już złożono jedno zamówienie - limit przekroczony');
      return;
    }

    alert(
      'Dziękuję za złożenie zamówienia. Lody do odbioru w dniu jutrzejszym.'
    );

    updateDoc(clientRef, {
      lastOrderDetails: newOrder.orderDetails,
      lastOrderDate: newOrder.dateOfOrder,
    });

    ordersCollection.add(newOrder);

    const updatedUser: User = { ...loggedUser, lastOrderDate: currentDate };

    this.ngrxStore.dispatch(setUser({ userLogged: updatedUser }));

    this.router.navigate(['dashboard']);
  }
}
