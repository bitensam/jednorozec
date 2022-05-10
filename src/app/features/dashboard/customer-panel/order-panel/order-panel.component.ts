import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/features/auth/auth.service';
import { Box } from 'src/app/shared/boxes/box.interface';
import { BoxesService } from 'src/app/shared/boxes/boxes.service';
import { IceCreamFlavour } from 'src/app/shared/ice-cream-flavours/ice-cream-flavour.interface';
import { IceCreamFlavoursService } from 'src/app/shared/ice-cream-flavours/ice-cream-flavours.service';
import { OrderDetailsItem } from 'src/app/shared/orders/order.interface';
import { User } from 'src/app/shared/user/user.interface';
import { FlavoursListService } from '../flavours-list.service';
import { OrderFormService } from './order-form.service';

@Component({
  selector: 'unicorn-order-panel',
  templateUrl: './order-panel.component.html',
  styleUrls: ['./order-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [OrderFormService],
})
export class OrderPanelComponent {
  public orderForm: FormGroup = this.orderFormService.orderForm;

  public loggedUser$ = this.authService.getLoggedInUser();

  public favFlavours$: Observable<IceCreamFlavour[] | undefined> =
    this.flavoursListService.getUserFavouriteFlavours$();

  public allFlavours$: Observable<IceCreamFlavour[]> =
    this.iceCreamFlavoursService.getIceCreamFlavours$();

  public boxes$: Observable<Box[]> = this.boxesService.getBoxes$();

  public orderItemsFromCart$: Observable<OrderDetailsItem[]> =
    this.orderFormService.getOrderItemsFromCart$();

  constructor(
    private flavoursListService: FlavoursListService,
    private iceCreamFlavoursService: IceCreamFlavoursService,
    private boxesService: BoxesService,
    private orderFormService: OrderFormService,
    private authService: AuthService
  ) {}

  public addToCart() {
    this.orderFormService.addOrderItemToCart(this.orderForm.value);
    this.orderForm.reset();
  }

  public addLastOrder() {
    this.orderFormService.addLastOrderToCart();
  }

  public submitOrder(itemsFromCart: OrderDetailsItem[], loggedUser: User) {
    this.orderFormService.submitOrder(itemsFromCart, loggedUser);
  }
}
