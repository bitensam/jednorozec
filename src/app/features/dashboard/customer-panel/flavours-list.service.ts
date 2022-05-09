import { Injectable } from '@angular/core';
import { IceCreamFlavour } from 'src/app/shared/ice-cream-flavours/ice-cream-flavour.interface';
import { updateDoc, doc, getFirestore, arrayUnion } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Injectable({
  providedIn: 'root',
})
export class FlavoursListService {
  constructor(private ngrxStore: Store<AppState>) {}

  public addUpdatedUserFavFlavoursToFirestore(
    userUid: string,
    flavour: IceCreamFlavour
  ) {
    const clientRef = doc(getFirestore(), `users/${userUid}`);

    updateDoc(clientRef, {
      favFlavours: arrayUnion(flavour),
    });
  }

  //ew. debug

  public getUserFavouriteFlavours$(): Observable<
    IceCreamFlavour[] | undefined
  > {
    return this.ngrxStore.select(({ user }) => {
      if (user.userLogged && user.userLogged?.favFlavours)
        return user.userLogged.favFlavours;
      return;
    });
  }
}
