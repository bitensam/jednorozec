import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Box } from 'src/app/shared/boxes/box.interface';
import { BoxesService } from 'src/app/shared/boxes/boxes.service';
import { IceCreamFlavour } from 'src/app/shared/ice-cream-flavours/ice-cream-flavour.interface';
import { IceCreamFlavoursService } from 'src/app/shared/ice-cream-flavours/ice-cream-flavours.service';
import { OrderDetailsItem } from 'src/app/shared/orders/order.interface';
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
  public favFlavours$: Observable<IceCreamFlavour[] | undefined> =
    this.flavoursListService.getUserFavouriteFlavours$();
  public allFlavours$: Observable<IceCreamFlavour[]> =
    this.iceCreamFlavoursService.getIceCreamFlavours$();
  public boxes$: Observable<Box[]> = this.boxesService.getBoxes$();
  public orderForm: FormGroup = this.orderFormService.orderForm;
  public orderItemsFromCart$: Observable<OrderDetailsItem[]> =
    this.orderFormService.getOrderItemsFromCart$();

  constructor(
    private flavoursListService: FlavoursListService,
    private iceCreamFlavoursService: IceCreamFlavoursService,
    private boxesService: BoxesService,
    private orderFormService: OrderFormService
  ) {}

  public addToCart() {
    this.orderFormService.addOrderItemToCart(this.orderForm.value);
  }

  public addLastOrder() {
    console.log('klikam');
    this.orderFormService.addLastOrderToCart();
  }
}
