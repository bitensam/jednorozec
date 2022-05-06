import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserCredentials } from 'src/app/shared/auth/userCredentials.interface';

import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { User } from 'src/app/shared/user/user.interface';
import { Roles } from 'src/app/shared/user/roles.enum';
import { Store } from '@ngrx/store';
import { setUser } from 'src/app/store/userState/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private fireStore: AngularFirestore,
    private ngrxStore: Store
  ) {}

  login({ email, password }: UserCredentials) {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (!user) return;
        const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(
          `users/${user.uid}`
        );

        userRef.get().subscribe((user) => {
          const userDataFromSnapshot = user.data();
          if (!userDataFromSnapshot) return;
          this.ngrxStore.dispatch(setUser({ user: userDataFromSnapshot }));
        });

        this.router.navigate(['dashboard']);
      });
  }

  // ToDo typowanie
  signUp(formValue: { email: string; password: string; role: Roles }) {
    return this.fireAuth
      .createUserWithEmailAndPassword(formValue.email, formValue.password)
      .then(({ user }) => {
        if (user)
          this.addUserToFirestore({
            email: user.email!,
            uid: user.uid,
            role: formValue.role,
          });
        console.log('User created', user);
      });
  }

  logout() {
    return this.fireAuth.signOut().then(() => {
      this.router.navigate(['auth']);
    });
  }

  addUserToFirestore(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      role: user.role,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
}
