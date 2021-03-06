import { Injectable } from '@angular/core';
import { IceCreamFlavour } from 'src/app/shared/ice-cream-flavours/ice-cream-flavour.interface';
import { updateDoc, doc, getFirestore, arrayUnion } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { User } from 'src/app/shared/user/user.interface';
import { setUser } from 'src/app/store/userState/user.actions';

@Injectable({
  providedIn: 'root',
})
export class FlavoursListService {
  constructor(private ngrxStore: Store<AppState>) {}

  public addUpdatedUserFavFlavoursToFirestore(
    loggedUser: User,
    flavour: IceCreamFlavour
  ) {
    const clientRef = doc(getFirestore(), `users/${loggedUser.uid}`);
    const currentFavFlavours = loggedUser.favFlavours!;
    const updatedUser: User = {
      ...loggedUser,
      favFlavours: [...currentFavFlavours, flavour],
    };
    this.ngrxStore.dispatch(setUser({ userLogged: updatedUser }));

    updateDoc(clientRef, {
      favFlavours: arrayUnion(flavour),
    });
  }

  public getUserFavouriteFlavours$(): Observable<
    IceCreamFlavour[] | undefined
  > {
    return this.ngrxStore.select(({ user }) => {
      if (user.userLogged?.favFlavours) return user.userLogged.favFlavours;
      return;
    });
  }

  public removeUserFavFlavour(loggedUser: User, flavour: IceCreamFlavour) {
    const clientRef = doc(getFirestore(), `users/${loggedUser.uid}`);

    const currentFavFlavours: IceCreamFlavour[] =
      loggedUser.favFlavours!.filter((item) => item !== flavour);

    const updatedUser = {
      ...loggedUser,
      favFlavours: [...currentFavFlavours],
    };

    this.ngrxStore.dispatch(setUser({ userLogged: updatedUser }));

    updateDoc(clientRef, {
      favFlavours: currentFavFlavours,
    });
  }
}
