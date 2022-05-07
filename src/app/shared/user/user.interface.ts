import { Order } from '../orders/order.interface';
import { Roles } from './roles.enum';

export interface User {
  uid: string;
  email: string;
  role: Roles;
  lastOrder?: Order[];
  lastOrderDate?: string;
  favFlavours?: string[];
}
