import { Roles } from './roles.enum';

export interface User {
  uid: string;
  email: string;
  role: Roles;
}
