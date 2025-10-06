import axios from 'axios';

// Use environment variable or fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

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

export const getCustomers = async () => {
    try {
        const response = await api.get('/customers/get-customers');
        return response.data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
}
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