import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'unicorn-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public userLogged$ = this.authService.getLoggedInUser();

  constructor(private authService: AuthService) {}

  public logout() {
    this.authService.logout();
  }

  public navForAdmin = [
    {
      label: 'Zamówienia',
      component: 'orders',
    },
    {
      label: 'Smaki lodów',
      component: 'ice-cream-flavours',
    },
    {
      label: 'Opakowania',
      component: 'boxes',
    },
    {
      label: 'Klienci',
      component: 'addCustomer',
    },
  ];

  public navForCustomer = [
    {
      label: 'Panel zamówienia',
      component: 'customer-panel',
    },
  ];
}
