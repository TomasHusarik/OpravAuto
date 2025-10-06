import { Technician } from "@/types/Technician";
import { Customer } from "@/types/Customer";

// Function to get full name of a user (Technician or Customer)
export const getFullName = (user: Technician | Customer) => {
    return `${user.lastName} ${user.firstName}`;
};

// Function to remove diacritics from a string and convert it to lowercase
export const removeDiacritics = (str: string): string => {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s]/gi, '')
        .toLowerCase();
}