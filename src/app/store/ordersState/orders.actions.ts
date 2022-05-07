import { createAction, props } from '@ngrx/store';
import { Order } from 'src/app/shared/orders/order.interface';

export const setOrders = createAction(
  '[orders] setOrders',
  props<{ todayOrders: Order[] }>()
);
