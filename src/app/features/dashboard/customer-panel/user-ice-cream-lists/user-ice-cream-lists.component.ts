import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/features/auth/auth.service';
import { IceCreamFlavour } from 'src/app/shared/ice-cream-flavours/ice-cream-flavour.interface';
import { IceCreamFlavoursService } from 'src/app/shared/ice-cream-flavours/ice-cream-flavours.service';
import { AppState } from 'src/app/store/app.state';
import { FlavoursListService } from '../flavours-list.service';

@Component({
  selector: 'unicorn-user-ice-cream-lists',
  templateUrl: './user-ice-cream-lists.component.html',
  styleUrls: ['./user-ice-cream-lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserIceCreamListsComponent {
  public allFlavours$ = this.iceCreamFlavoursService.getIceCreamFlavours$();
  public loggedUser$ = this.authService.getLoggedInUser();

  constructor(
    private iceCreamFlavoursService: IceCreamFlavoursService,
    private authService: AuthService,
    private flavoursListService: FlavoursListService
  ) {}

  public addFlavourToFavourites(userUid: string, flavor: IceCreamFlavour) {
    this.flavoursListService.addUpdatedUserFavFlavoursToFirestore(
      userUid,
      flavor
    );
  }
}
