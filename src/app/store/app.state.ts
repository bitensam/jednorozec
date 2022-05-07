import { ordersReducer, OrdersState } from './ordersState/orders.reducer';
import { userReducer, UserState } from './userState/user.reducer';

export interface AppState {
  user: UserState;
  orders: OrdersState;
}

export const AppState = {
  user: userReducer,
  orders: ordersReducer,
};
