import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { UnitsComponent } from './units/units.component';
import { IceCreamFlavoursComponent } from './ice-cream-flavours/ice-cream-flavours.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'ice-cream-flavours',
        component: IceCreamFlavoursComponent,
      },
      {
        path: 'units',
        component: UnitsComponent,
      },
      {
        path: 'addCustomer',
        component: AddCustomerComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    AddCustomerComponent,
    UnitsComponent,
    IceCreamFlavoursComponent,
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
  ],
})
export class DashboardModule {}
