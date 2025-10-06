import { Technician } from "@/types/Technician";
import { Customer } from "@/types/Customer";

export const getFullName = (user: Technician | Customer) => {
    return `${user.firstName} ${user.lastName}`;
};