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
import { IceCreamFlavoursComponent } from './ice-cream-flavours/ice-cream-flavours.component';

import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from 'src/app/shared/user/roles.enum';

import { OrdersComponent } from './orders/orders.component';
import { BoxesComponent } from './boxes/boxes.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [RoleGuard],
        data: { roles: [Roles.admin] },
      },
      {
        path: 'ice-cream-flavours',
        component: IceCreamFlavoursComponent,
        canActivate: [RoleGuard],
        data: { roles: [Roles.admin] },
      },
      {
        path: 'boxes',
        component: BoxesComponent,
        canActivate: [RoleGuard],
        data: { roles: [Roles.admin] },
      },
      {
        path: 'addCustomer',
        component: AddCustomerComponent,
        canActivate: [RoleGuard],
        data: { roles: [Roles.admin] },
      },
    ],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    AddCustomerComponent,
    IceCreamFlavoursComponent,

    OrdersComponent,
    BoxesComponent,
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
