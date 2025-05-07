import { useState } from 'react';
import { authApi } from '../services/api/auth';
import { router } from 'expo-router';
import * as z from 'zod';

// Define validation schema with Zod
const registerSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  gender: z.enum(['M', 'F', 'O'], { 
    errorMap: () => ({ message: 'Please select a valid gender (M, F, or O)' }) 
  }),
  age: z.number().int().positive('Age must be a positive number'),
  role: z.enum(['A', 'E'], { 
    errorMap: () => ({ message: 'Please select a valid role (A or U)' }) 
  }),
  phone_number: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required')
});

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required')
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;

 const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateRegisterData = (data: any): { valid: boolean; errors?: any } => {
    try {
      registerSchema.parse(data);
      return { valid: true };
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = err.errors.reduce((acc: any, error) => {
          const path = error.path[0];
          acc[path as string] = error.message;
          return acc;
        }, {});
        return { valid: false, errors };
      }
      return { valid: false, errors: { form: 'Invalid data provided' } };
    }
  };

  const validateLoginData = (data: any): { valid: boolean; errors?: any } => {
    try {
      loginSchema.parse(data);
      return { valid: true };
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = err.errors.reduce((acc: any, error) => {
          const path = error.path[0];
          acc[path as string] = error.message;
          return acc;
        }, {});
        return { valid: false, errors };
      }
      return { valid: false, errors: { form: 'Invalid data provided' } };
    }
  };

  const register = async (data: RegisterFormValues) => {
    setLoading(true);
    setError(null);
    
    const validation = validateRegisterData(data);
    if (!validation.valid) {
      setLoading(false);
      setError('Validation failed. Please check your inputs.');
      return { success: false, errors: validation.errors };
    }
    
    try {
        console.log("data in hook: "+ data)
      await authApi.register(data);
      setLoading(false);
      router.navigate('/panel');
      return { success: true };
    } catch (err: any) {
      setLoading(false);
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, errors: { form: errorMessage } };
    }
  };

  const login = async (data: LoginFormValues) => {
    setLoading(true);
    setError(null);
    
    const validation = validateLoginData(data);
    if (!validation.valid) {
      setLoading(false);
      setError('Validation failed. Please check your inputs.');
      return { success: false, errors: validation.errors };
    }
    
    try {
      await authApi.login(data.email, data.password);
      setLoading(false);
      router.navigate('/dashboard/panel');
      return { success: true };
    } catch (err: any) {
      setLoading(false);
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return { success: false, errors: { form: errorMessage } };
    }
  };

  return {
    register,
    login,
    loading,
    error
  };
};

export default useAuth;
