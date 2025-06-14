import { useAuthStore } from '@/store/authStore';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'; // Make sure to import SecureStore
import { V1_OPERATIONS_URL } from './api/config';

const api = axios.create({
    baseURL: V1_OPERATIONS_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to attach access token from localStorage
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

interface Shift {
    name: string;
    route_id: number;
    team_id: number;
    start_time: string;
}

export const shiftApi = {
    getAllShifts: async () => {
        const response = await api.get('/shift/');
        return response.data;
    },
    getShift: async (id: string) => {
        const response = await api.get(`/shift/${id}/`);
        return response.data;
    },
    createShift: async (shift: Shift) => {
        const response = await api.post('/create-shift/', shift);
        return response.data;
    },
    getShiftsForTeam: async (teamId: string) => {
        const response = await api.get(`/get-shifts-for-team/${teamId}/`);
        return response.data;
    }
};

