export interface OrderItem {
  _id: string;
  serviceItemId?: string;
  label: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}   