import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/user/user.interface';

export const setUser = createAction('[user] setUser', props<{ user: User }>());
