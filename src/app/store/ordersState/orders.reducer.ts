import { createReducer, on } from '@ngrx/store';
import { Order, OrderDetailsItem } from 'src/app/shared/orders/order.interface';
import { setOrders, setTempOrders } from './orders.actions';

export interface OrdersState {
  todayOrders: Order[];
  tempOrders: OrderDetailsItem[];
}

const initialState: OrdersState = {
  todayOrders: [],
  tempOrders: [],
};

export const ordersReducer = createReducer(
  initialState,
  on(setOrders, (state, { todayOrders }) => {
    console.log(state, todayOrders);
    return { ...state, todayOrders: todayOrders };
  }),
  on(setTempOrders, (state, { tempOrder }) => {
    console.log(state, tempOrder);
    return { ...state, tempOrders: [...state.tempOrders, tempOrder] };
  })
);
