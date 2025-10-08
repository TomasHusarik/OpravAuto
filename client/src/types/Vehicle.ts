export interface Vehicle {
  _id?: string;
  make?: string;
  model?: string;
  year?: number;
  licensePlate?: string;
  vin?: string;
  customerId: string;
}