import { Technician } from "@/types/Technician";
import { Customer } from "@/types/Customer";
import { Vehicle } from "@/types/Vehicle";
import { notifications } from "@mantine/notifications";

// Function to get full name of a user (Technician or Customer)
export const getFullName = (user: Technician | Customer) => {
    return `${user?.lastName} ${user?.firstName}`;
};

// Function to get full name of a user (Technician or Customer)
export const getVehicleName = (vehicle: Vehicle) => {
    return `${vehicle?.make} ${vehicle?.model}`;
};

// Function to remove diacritics from a string and convert it to lowercase
export const removeDiacritics = (str: string): string => {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s]/gi, '')
        .toLowerCase();
}

export const getUrlParameterByName = (name: string, url?: string) => {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const showSuccessNotification = (message: string) => {
                notifications.show({
                    title: 'Success',
                    message: message,
                    color: 'green',
                });
}

export const showErrorNotification = (message: string) => {
                notifications.show({
                    title: 'Error',
                    message: message,
                    color: 'red',
                });
}