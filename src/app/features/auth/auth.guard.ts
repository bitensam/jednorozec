import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take, tap } from 'rxjs';
import { AppState } from 'src/app/store/app.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private ngrxStore: Store<AppState>, private router: Router) {}

  public canActivate(): Observable<boolean> {
    return this.ngrxStore
      .select(({ user }) => {
        return user.isAuthenticated;
      })
      .pipe(
        take(1),
        tap((isActive) => {
          if (isActive) return;

          this.router.navigate(['auth']);
        })
      );
  }
}
