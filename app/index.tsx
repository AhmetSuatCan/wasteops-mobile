// app/index.tsx
import { Redirect } from 'expo-router';
import { useAuthStore } from '../store/authStore';

export default function Index() {
  const { isAuthenticated } = useAuthStore();
  
  return isAuthenticated ? 
    <Redirect href="/panel" /> : 
    <Redirect href="/login" />;
}
