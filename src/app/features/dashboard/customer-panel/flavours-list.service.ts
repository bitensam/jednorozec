import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IceCreamFlavour } from 'src/app/shared/ice-cream-flavours/ice-cream-flavour.interface';

import { updateDoc, doc, getFirestore, arrayUnion } from 'firebase/firestore';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { AuthService } from '../../auth/auth.service';
import { User } from 'src/app/shared/user/user.interface';
import { setUser } from 'src/app/store/userState/user.actions';

@Injectable({
  providedIn: 'root',
})
export class FlavoursListService {
  constructor(
    private fireStore: AngularFirestore,
    private authService: AuthService,
    private ngrxStore: Store<AppState>
  ) {}

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
