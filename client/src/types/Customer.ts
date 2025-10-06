export interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  vehicles?: string[];
  createdAt?: string;
  updatedAt?: string;
}