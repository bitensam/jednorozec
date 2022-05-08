import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentData,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { IceCreamFlavour } from 'src/app/shared/ice-cream-flavours/ice-cream-flavour.interface';
import { User } from 'src/app/shared/user/user.interface';
import { updateDoc, doc, getFirestore, arrayUnion } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FlavoursListService {
  constructor(private fireStore: AngularFirestore) {}

  public addUpdatedUserFavFlavoursToFirestore(
    userUid: string,
    flavour: IceCreamFlavour
  ) {
    const clientRef = doc(getFirestore(), `users/${userUid}`);

    updateDoc(clientRef, {
      favFlavours: arrayUnion(flavour),
    });
  }
}
