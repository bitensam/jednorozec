import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IceCreamFlavour } from './ice-cream-flavour.interface';

@Injectable({
  providedIn: 'root',
})
export class IceCreamFlavoursService {
  private iceCreamFlavoursCollection: AngularFirestoreCollection<IceCreamFlavour> =
    this.fireStore.collection<IceCreamFlavour>('ice-creams');

  constructor(private fireStore: AngularFirestore) {}

  public getIceCreamFlavours$(): Observable<IceCreamFlavour[]> {
    return this.iceCreamFlavoursCollection.valueChanges({
      idField: 'flavourId',
    });
  }

  public addNewFlavour(enteredFlavour: IceCreamFlavour) {
    alert('Nowy smak dodany');
    this.iceCreamFlavoursCollection.add(enteredFlavour);
  }

  public deleteFlavour(id: string) {
    this.iceCreamFlavoursCollection.doc(id).delete();
  }
}
