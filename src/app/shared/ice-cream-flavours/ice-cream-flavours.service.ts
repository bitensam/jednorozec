import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

// TO DO: INTERFACE, W

@Injectable({
  providedIn: 'root',
})
export class IceCreamFlavoursService {
  private activeFlavours: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  constructor(private fireStore: AngularFirestore) {}

  public getCurrentActiveFlavours(): string[] {
    return this.activeFlavours.getValue();
  }

  public addNewFlavour(flavour: string) {
    this.activeFlavours.next([...this.activeFlavours.value, flavour]);
  }
}
