export interface Vehicle {
  _id?: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  color?: string;
  mileage?: number;
  engineType?: "Gasoline" | "Diesel" | "Electric" | "Hybrid" | "Other";
  transmission?: "Manual" | "Automatic" | "CVT" | "Other";
  owner: string;
  notes?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}