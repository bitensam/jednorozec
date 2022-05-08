import { createAction, props } from '@ngrx/store';
import { Order, OrderDetailsItem } from 'src/app/shared/orders/order.interface';

export const setOrders = createAction(
  '[orders] setOrders',
  props<{ todayOrders: Order[] }>()
);

export const setTempOrders = createAction(
  '[orders] setTempOrders',
  props<{ tempOrder: OrderDetailsItem }>()
);
