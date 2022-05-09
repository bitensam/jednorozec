import { createReducer, on } from '@ngrx/store';
import { IceCreamFlavour } from 'src/app/shared/ice-cream-flavours/ice-cream-flavour.interface';
import { setFlavours } from './flavours.actions';

export interface FlavoursState {
  currentFlavours: IceCreamFlavour[];
}

const initialState: FlavoursState = {
  currentFlavours: [],
};

export const flavoursReducer = createReducer(
  initialState,
  on(setFlavours, (state, { currentFlavours }) => {
    return { ...state, currentFlavours: currentFlavours };
  })
);
