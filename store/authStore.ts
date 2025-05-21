import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { authApi } from '../services/api/auth';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  hasOrganization: any | null;  // Store organization data or null
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  hasOrganization: null,  // Initially null, will be updated after login or token check
  isLoading: true,

  login: async (email, password) => {
    try {
      const data = await authApi.login(email, password);
      console.log(`this is response data: ${data}`)

      // Save tokens to SecureStore
      await SecureStore.setItemAsync('accessToken', data.tokens.access);
      await SecureStore.setItemAsync('refreshToken', data.tokens.refresh);
      
      const userData = await authApi.getUser();
      console.log(`this is user data: ${userData.role}`)
      
      // Role-based organization data fetching
      let organizationData;
      if (userData.role === 'A') {
        organizationData = await authApi.checkOwnedOrganization();
      } else if (userData.role === 'E') {
        organizationData = await authApi.checkActiveEmployment();
      } else {
        organizationData = false;
      }

      set({ 
        user: userData,
        isAuthenticated: true,
        hasOrganization: organizationData,
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const data = await authApi.register(userData);

      await SecureStore.setItemAsync('accessToken', data.tokens.access);
      await SecureStore.setItemAsync('refreshToken', data.tokens.refresh);
      
      set({ 
        user: data.user, 
        isAuthenticated: true, 
        hasOrganization: null, // Default to null until we check
      });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
  
  logout: async () => {
    try {
      await authApi.logout();
      set({ 
        user: null, 
        isAuthenticated: false, 
        hasOrganization: null // Reset organization state on logout
      });
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },
  
  checkAuth: async () => {
    try {
      set({ isLoading: true });
      
      const accessToken = await SecureStore.getItemAsync('accessToken');
      
      if (!accessToken) {
        set({ isAuthenticated: false, user: null, isLoading: false });
        return false;
      }
      
      const { valid, data } = await authApi.validateToken();
      
      if (valid) {
        const userData = await authApi.getUser();
        
        // Role-based organization data fetching
        let organizationData;
        if (userData.role === 'A') {
          organizationData = await authApi.checkOwnedOrganization();
        } else if (userData.role === 'E') {
          organizationData = await authApi.checkActiveEmployment();
        } else {
          organizationData = false;
        }
        
        set({ 
          isAuthenticated: true, 
          user: userData, 
          hasOrganization: organizationData,
          isLoading: false 
        });
        
        return true;
      } else {
        set({ isAuthenticated: false, user: null, isLoading: false });
        return false;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      set({ isAuthenticated: false, user: null, isLoading: false });
      return false;
    }
  },
}));


