import { Customer } from '@/types/Customer';
import { Vehicle } from '@/types/Vehicle';
import axios from 'axios';

// Use environment variable or fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

//#region Order APIs 
export const getOrder = async (orderId: string) => {
    try {
        const response = await api.get(`/orders/get-order/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
}

export const getOrders = async () => {
    try {
        const response = await api.get('/orders/get-orders');
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}

//#region Vehicle APIs
export const getCustomerVehicles = async (ownerID: string) => {
    try {
        const response = await api.get(`/vehicles/get-vehicles/${ownerID}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
    }
}

export const addVehicle = async (vehicleData: Vehicle) => {
    try {
        const response = await api.post('/vehicles/add-vehicle', vehicleData);
        return response.data;
    } catch (error) {
        console.error('Error saving vehicle:', error);
        throw error;
    }
};

export const updateVehicle = async (vehicleData: Vehicle) => {
    try {
        const response = await api.put(`/vehicles/update-vehicle/${vehicleData._id}`, vehicleData);
        return response.data;
    } catch (error) {
        console.error('Error updating vehicle:', error);
        throw error;
    }
};

export const deleteVehicle = async (vehicleId: string) => {
    try {
        const response = await api.delete(`/vehicles/delete-vehicle/${vehicleId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        throw error;
    }
}

//#region Customer APIs 

export const deleteCustomer = async (customerId: string) => {
    try {
        const response = await api.delete(`/customers/delete-customer/${customerId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting customer:', error);
        throw error;
    }
}

export const updateCustomer = async (customerData: Customer) => {
    try {
        const response = await api.put(`/customers/update-customer`, customerData);
        return response.data;
    } catch (error) {
        console.error('Error updating customer:', error);
        throw error;
    }
}

export const addCustomer = async (customerData: Customer) => {
    try {
        const response = await api.post('/customers/add-customer', customerData);
        return response.data;
    } catch (error) {
        console.error('Error saving customer:', error);
        throw error;
    }
}

export const getCustomers = async () => {
    try {
        const response = await api.get('/customers/get-customers');
        return response.data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
}

export const getCustomer = async (customerId: string) => {
    try {
        const response = await api.get(`/customers/get-customer/${customerId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching customer:', error);
        throw error;
    }
}

//#region Auth APIs
export const loginUser = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/login', {
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error('Error authenticating user:', error);
        throw error;
    }
};