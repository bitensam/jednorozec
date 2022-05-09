import {
  flavoursReducer,
  FlavoursState,
} from './flavoursState/flavours.reducer';
import { ordersReducer, OrdersState } from './ordersState/orders.reducer';
import { userReducer, UserState } from './userState/user.reducer';

export interface AppState {
  user: UserState;
  orders: OrdersState;
  flavours: FlavoursState;
}

export const AppState = {
  user: userReducer,
  orders: ordersReducer,
  flavours: flavoursReducer,
};
