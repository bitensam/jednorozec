import { createAction, props } from '@ngrx/store';
import { IceCreamFlavour } from 'src/app/shared/ice-cream-flavours/ice-cream-flavour.interface';

export const setFlavours = createAction(
  '[flavours] setFlavours',
  props<{ currentFlavours: IceCreamFlavour[] }>()
);
