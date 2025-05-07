import axios from 'axios';
import  { V1_AUTH_URL, V1_ORGANIZATION_URL }  from './config';
import { saveToken, getToken, deleteToken } from '../../utils/secureStorage';

// Type for registration data
export interface RegisterData {
  email: string;
  name: string;
  password: string;
  gender: 'M' | 'F' | 'O';
  age: number;
  role: 'A' | 'U';
  phone_number: string;
  address: string;
}

// Create axios instance
const api = axios.create({
  baseURL: V1_AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach access token
api.interceptors.request.use(
  async (config) => {
    const token = await getToken('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Ensure that error.response exists before accessing its properties
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = await getToken('refreshToken');
        if (!refreshToken) {
          // No refresh token available, reject the promise
          return Promise.reject(new Error('No refresh token available'));
        }
        
        const response = await axios.post(`${V1_AUTH_URL}/token/refresh/`, {
          refresh: refreshToken,
        });
        
        const { access: accessToken, refresh: newRefreshToken } = response.data;
        
        await saveToken('accessToken', accessToken);
        
        // Save new refresh token if provided
        if (newRefreshToken) {
          await saveToken('refreshToken', newRefreshToken);
        }
        
        // Update auth header and retry request
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure
        await deleteToken('accessToken');
        await deleteToken('refreshToken');
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login/', { email, password });
      console.log(response)
      const { access, refresh, user } = response.data;
      
      // Store tokens in secure storage
      await saveToken('accessToken', access);
      await saveToken('refreshToken', refresh);
      
      return { user, tokens: { access, refresh } };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: async (userData: RegisterData) => {
    try {
      const response = await api.post('/auth/register/', userData);
      
      // If registration automatically logs in user
      if (response.data.access && response.data.refresh) {
        const { access, refresh, user } = response.data;
        
        // Store tokens in secure storage
        await saveToken('accessToken', access);
        await saveToken('refreshToken', refresh);
        
        return { user, tokens: { access, refresh } };
      }
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  validateToken: async () => {
    try {
      const token = await getToken('accessToken');
      
      if (!token) {
        return { valid: false, error: 'No token found' };
      }
      
      const response = await api.post('/token/verify/', {
        token,
      });
      
      return { valid: true, data: response.data };
    } catch (error) {
      console.error('Token validation error:', error);
      return { valid: false, error };
    }
  },

  // Logout function to clear tokens
  logout: async () => {
    try {
      // You might want to call a backend logout endpoint here
      // await api.post('/auth/logout');
      
      // Delete tokens from secure storage
      await deleteToken('accessToken');
      await deleteToken('refreshToken');
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  // Get current user's data
  getUser: async () => {
    try {
      const response = await api.get('/me');
      return response.data;
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  },
checkOrganization : async () => {
    const response = await axios.get(`${V1_ORGANIZATION_URL}/core/checkOrganization/`, {
      headers: {
        Authorization: `Bearer ${await getToken('accessToken')}`,
      },
    });
    if (response.status === 200) {
      return response.data;  
    } else {
      return null;
  }
}
};

export default api;

