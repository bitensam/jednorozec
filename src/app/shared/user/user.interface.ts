import { OrderDetailsItem } from '../orders/order.interface';
import { Roles } from './roles.enum';

export interface User {
  uid: string;
  email: string;
  role: Roles;
  lastOrderDetails?: OrderDetailsItem[];
  lastOrderDate?: string;
  favFlavours?: string[];
}
