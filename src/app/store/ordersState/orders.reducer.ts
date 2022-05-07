import { createReducer, on } from '@ngrx/store';
import { Order } from 'src/app/shared/orders/order.interface';
import { setOrders } from './orders.actions';

export interface OrdersState {
  todayOrders: Order[] | [];
}

const initialState: OrdersState = {
  todayOrders: [],
};

export const ordersReducer = createReducer(
  initialState,
  on(setOrders, (state, { todayOrders }) => {
    console.log(state, todayOrders);
    return { ...state, todayOrders: todayOrders };
  })
);
