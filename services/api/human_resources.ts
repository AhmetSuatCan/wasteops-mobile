import { useAuthStore } from '@/store/authStore';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'; // Make sure to import SecureStore
import { V1_HUMAN_RESOURCES_URL } from './config';

const api = axios.create({
    baseURL: V1_HUMAN_RESOURCES_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to attach access token from auth store
api.interceptors.request.use(
  async (config) => {
    const { isAuthenticated } = useAuthStore.getState();  // Accessing the global store
    if (isAuthenticated) {
      const accessToken = await SecureStore.getItemAsync('accessToken');  // Fetching token from SecureStore
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const humanResourcesApi = {
    generateCode: async () => {
        try {
            const response = await api.post('/generate-code/');
            return response.data;
        } catch (error) {
            console.error('Error generating code:', error);
            throw error;
        }
    },
    useCode: async (code: string) => {
        try {
            const response = await api.post('/use-code/', { code });
            return response.data;
        } catch (error) {
            console.error('Error using code:', error);
            throw error;
        }
    },
    getCodes: async () => {
        try {
            const response = await api.get('/list-active-codes/');
            return response.data;
        } catch (error) {
            console.error('Error getting codes:', error);
            throw error;
        }
    },
    expireCode: async (code: string) => {
        try {
            const response = await api.post('/expire-code/', { code });
            return response.data;
        } catch (error) {
            console.error('Error expiring code:', error);
            throw error;
        }
    },
    getEmployees: async () => {
        try {
            const response = await api.get('/list-active-employees/');

            return response.data;
        } catch (error) {
            console.error('Error getting employees:', error);
            throw error;
        }
    },
    endEmployment: async (employeeId: string) => {
        try {
            console.log('employeeId', employeeId);
            const response = await api.post(`/end-employment/${employeeId}/`);
            return response.data;
        } catch (error) {
            console.error('Error ending employment:', error);
            throw error;
        }
    },
    getActiveEmploymentId: async (userId: string, organizationId: string) => {
        try {
            const response = await api.get(`/active-employment-id/?user_id=${userId}&organization_id=${organizationId}`);
            return response.data;
        } catch (error) {
            console.error('(API CALL)Error while getting active employment id:', error);
            throw error;
        }
    }
};
