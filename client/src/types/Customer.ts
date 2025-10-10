import { Vehicle } from "@/types/Vehicle";

export interface Customer {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  vehicles?: Vehicle[];
  note?: string;
  createdAt?: string;
  updatedAt?: string;
}