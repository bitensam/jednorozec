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
  public getBoxes$(): Observable<Box[]> {
    return this.boxesCollection.valueChanges();
  }

  constructor(private fireStore: AngularFirestore) {}

  public addNewBox(enteredFormValue: Box) {
    const newBox = {
      name: enteredFormValue.name,
      value: enteredFormValue.value,
    };

    this.boxesCollection.add(newBox);
  }
}
