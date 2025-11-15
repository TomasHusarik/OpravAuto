import { Customer } from "./Customer";
import { Vehicle } from "./Vehicle";

export interface Order {
    _id?: string;
    status?: string;
    totalCost?: number;
    notes?: string;
    customer?: Customer;
    vehicle?: Vehicle;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
}