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

export const setUserLastOrder = createAction(
  '[orders] setUserLastOrder',
  props<{ lastOrder: OrderDetailsItem[] }>()
);

export const setTempOrderFromLast = createAction(
  '[orders] etTempOrderFromLast',
  props<{ tempLastOrder: OrderDetailsItem[] }>()
);

export const clearTempOrders = createAction('[orders] clearTempOrders');
