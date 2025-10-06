import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await api.post('/technicians/login', {
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error('Error authenticating user:', error);
        throw error;
    }
};
