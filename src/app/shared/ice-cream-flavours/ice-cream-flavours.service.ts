import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { IceCreamFlavour } from './ice-cream-flavour.interface';

// TO DO: INTERFACE, W

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
    if (
      this.fireStore.collection<IceCreamFlavour>('ice-creams', (ref) =>
        ref.where('flavour', '==', enteredFlavour)
      )
    ) {
      alert('Smak o takiej nazwie już jest w bazie danych');
      return;
    }
    this.iceCreamFlavoursCollection.add(enteredFlavour);
  }

  public deleteFlavour(id: string) {
    this.iceCreamFlavoursCollection.doc(id).delete();
  }
}
