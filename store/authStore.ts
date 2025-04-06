// store/authStore.ts
import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { authApi } from '../services/api/auth';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  
  login: async (email, password) => {
    try {
      const data = await authApi.login(email, password);
      console.log("error point:")
      console.log(data.tokens.access)
      
      await SecureStore.setItemAsync('accessToken', data.tokens.access);
      await SecureStore.setItemAsync('refreshToken', data.tokens.refresh);
      
      set({ user: data.user, isAuthenticated: true });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  
  register: async (userData) => {
    try {
      const data = await authApi.register(userData);
      await SecureStore.setItemAsync('accessToken', data.accessToken);
      await SecureStore.setItemAsync('refreshToken', data.refreshToken);
      
      set({ user: data.user, isAuthenticated: true });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
  
  logout: async () => {
    await authApi.logout();
    set({ user: null, isAuthenticated: false });
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
        set({ isAuthenticated: true, user: data.user, isLoading: false });
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
  }
}));
