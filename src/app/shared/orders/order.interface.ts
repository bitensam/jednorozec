export interface OrderDetailsItem {
  flavour: string;
  quantity: number;
  unit: string;
}

export interface Order {
  dateOfOrder: string;
  customerEmail: string;
  orderDetails: OrderDetailsItem[];
}
