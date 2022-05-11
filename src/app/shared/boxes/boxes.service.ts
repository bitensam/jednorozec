import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Box } from './box.interface';

@Injectable({
  providedIn: 'root',
})
export class BoxesService {
  private boxesCollection: AngularFirestoreCollection<Box> =
    this.fireStore.collection<Box>('boxes');

  constructor(private fireStore: AngularFirestore) {}

  public getBoxes$(): Observable<Box[]> {
    return this.boxesCollection.valueChanges({ idField: 'boxId' });
  }

  public addNewBox(enteredFormValue: Box) {
    const newBox = {
      name: enteredFormValue.name,
      value: enteredFormValue.value,
    };
    alert('Nowe pudełko dodane');
    this.boxesCollection.add(newBox);
  }

  public deleteBox(id: string) {
    this.boxesCollection.doc(id).delete();
  }
}
