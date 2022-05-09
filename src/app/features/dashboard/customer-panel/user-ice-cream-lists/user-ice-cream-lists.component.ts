import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/features/auth/auth.service';
import { IceCreamFlavour } from 'src/app/shared/ice-cream-flavours/ice-cream-flavour.interface';
import { IceCreamFlavoursService } from 'src/app/shared/ice-cream-flavours/ice-cream-flavours.service';
import { User } from 'src/app/shared/user/user.interface';
import { FlavoursListService } from '../flavours-list.service';

@Component({
  selector: 'unicorn-user-ice-cream-lists',
  templateUrl: './user-ice-cream-lists.component.html',
  styleUrls: ['./user-ice-cream-lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserIceCreamListsComponent {
  public allFlavours$: Observable<IceCreamFlavour[]> =
    this.iceCreamFlavoursService.getIceCreamFlavours$();
  public loggedUser$: Observable<User | null> =
    this.authService.getLoggedInUser();
  public favFlavours$: Observable<IceCreamFlavour[] | undefined> =
    this.flavoursListService.getUserFavouriteFlavours$();

  constructor(
    private iceCreamFlavoursService: IceCreamFlavoursService,
    private authService: AuthService,
    private flavoursListService: FlavoursListService
  ) {}

  public addFlavourToFavourites(loggedUser: User, flavour: IceCreamFlavour) {
    this.flavoursListService.addUpdatedUserFavFlavoursToFirestore(
      loggedUser,
      flavour
    );
  }
}
