import { createReducer, on } from '@ngrx/store';
import { Roles } from 'src/app/shared/user/roles.enum';
import { User } from 'src/app/shared/user/user.interface';
import { setUser } from './user.actions';

const initialState: User = { uid: '', email: '', role: '' as Roles };

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => {
    console.log('state:', state, 'user:', user);
    return { ...state, user };
  })
);
