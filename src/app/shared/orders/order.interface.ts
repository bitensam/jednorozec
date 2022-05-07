export interface OrderDetailsItem {
  flavour: string;
  quantity: number;
  unit: string;
}

export interface OrderByCustomer {
  customerEmail: string;
  orderDetails: OrderDetailsItem[];
}

export interface Order {
  dateOfOrder: string;
  ordersByCustomer: OrderByCustomer[];
}
