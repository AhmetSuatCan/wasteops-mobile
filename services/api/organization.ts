import axios from 'axios';
import { V1_ORGANIZATION_URL } from './config';
import * as SecureStore from 'expo-secure-store';  // Make sure to import SecureStore
import { useAuthStore } from '../../store/authStore';  // Importing the store
import {  getToken } from '../../utils/secureStorage';

const api = axios.create({
  baseURL: V1_ORGANIZATION_URL,
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

export const organizationApi = {
  createOrganization: async (data: {
    name: string;
    address: string;
    organization_type: string;
    num_of_facilities: number;
    num_of_cars: number;
    num_of_containers: number;
  }) => {
    try {
      console.log('Request initiated to create organization');
      const response = await api.post('/core/create/', data);
      return response.data;
    } catch (error) {
      console.error('Create organization error:', error);
      throw error;
    }
  },

};

