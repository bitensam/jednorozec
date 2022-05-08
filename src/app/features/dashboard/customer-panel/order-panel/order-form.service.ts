import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderDetailsItem } from 'src/app/shared/orders/order.interface';
import { AppState } from 'src/app/store/app.state';
import { setTempOrders } from 'src/app/store/ordersState/orders.actions';

@Injectable()
export class OrderFormService {
  public readonly orderForm: FormGroup = this.fb.group({
    flavour: ['', { validators: [Validators.required, Validators.max(1)] }],
    quantity: [1, { validators: [Validators.required, Validators.min(1)] }],
    unit: ['box 1L', { validators: [Validators.required, Validators.min(1)] }],
  });

  constructor(private fb: FormBuilder, private ngrxStore: Store<AppState>) {}

  // TO DO refactor nazw
  public addOrderItemToCart() {
    const formValue = this.orderForm.value;
    this.ngrxStore.dispatch(setTempOrders({ tempOrder: formValue }));
  }

  public getOrderItemsFromCart$(): Observable<OrderDetailsItem[]> {
    return this.ngrxStore.select(({ orders }) => orders.tempOrders);
  }
}
