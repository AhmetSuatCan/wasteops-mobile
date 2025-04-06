// app/auth/_layout.tsx
import { Stack } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
      router.replace('/dashboard/panel');
    }
  }, [isAuthenticated]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
