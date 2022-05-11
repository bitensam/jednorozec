import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/shared/user/roles.enum';
import { User } from 'src/app/shared/user/user.interface';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private customersCollection: AngularFirestoreCollection<User> =
    this.fireStore.collection<User>('users', (ref) =>
      ref.where('role', '==', 'customer')
    );

  public getCustomers$(): Observable<User[]> {
    return this.customersCollection.valueChanges();
  }

  constructor(
    private fireStore: AngularFirestore,
    private authService: AuthService
  ) {}

  public addCustomer(formValue: {
    email: string;
    password: string;
    role: Roles;
  }) {
    alert('Nowy użytkownik dodany');
    this.authService.signUp(formValue);
  }
}
