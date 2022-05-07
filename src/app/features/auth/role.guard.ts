import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { Roles } from 'src/app/shared/user/roles.enum';
import { AppState } from 'src/app/store/app.state';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private ngrxStore: Store<AppState>, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const canActivateRoles = route.data['roles'] as Roles[];
    return this.ngrxStore
      .select(({ user }) => {
        return user;
      })
      .pipe(
        map((item) => canActivateRoles.includes(item.userLogged!.role)),
        tap((canActivate) => {
          if (canActivate) {
            return;
          }
          alert(
            'Ta opcja jest dla użytkowników o roli: ' +
              canActivateRoles.join(', ')
          );
        })
      );
  }
}
