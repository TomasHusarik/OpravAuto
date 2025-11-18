import { Customer } from "./Customer";
import { OrderItem } from "./OrderItem";
import { Vehicle } from "./Vehicle";

export interface Order {
    _id?: string;
    status?: string;
    totalCost?: number;
    notes?: string;
    customer?: Customer;
    vehicle?: Vehicle;
    items?: OrderItem[];
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
}