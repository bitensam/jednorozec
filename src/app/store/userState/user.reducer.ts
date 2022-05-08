import { createReducer, on } from '@ngrx/store';
import { OrderDetailsItem } from 'src/app/shared/orders/order.interface';
import { User } from 'src/app/shared/user/user.interface';
import { setUser } from './user.actions';

export interface UserState {
  userLogged: User | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  userLogged: null,
  isAuthenticated: false,
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, { userLogged }) => {
    console.log(state, userLogged);
    return { ...state, userLogged: userLogged, isAuthenticated: true };
  })
);
