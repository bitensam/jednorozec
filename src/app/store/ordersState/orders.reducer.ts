import { createReducer, on } from '@ngrx/store';
import { Order, OrderDetailsItem } from 'src/app/shared/orders/order.interface';
import {
  setOrders,
  setTempOrderFromLast,
  setTempOrders,
  setUserLastOrder,
} from './orders.actions';

export interface OrdersState {
  todayOrders: Order[];
  tempOrders: OrderDetailsItem[];
  lastOrder: OrderDetailsItem[];
}

const initialState: OrdersState = {
  todayOrders: [],
  tempOrders: [],
  lastOrder: [],
};

export const ordersReducer = createReducer(
  initialState,
  on(setOrders, (state, { todayOrders }) => {
    console.log(state, todayOrders);
    return { ...state, todayOrders: todayOrders };
  }),
  on(setTempOrders, (state, { tempOrder }) => {
    return { ...state, tempOrders: [...state.tempOrders, tempOrder] };
  }),
  on(setUserLastOrder, (state, { lastOrder }) => {
    return { ...state, lastOrder };
  }),
  on(setTempOrderFromLast, (state, { tempLastOrder }) => {
    return { ...state, tempOrders: tempLastOrder };
  })
);
