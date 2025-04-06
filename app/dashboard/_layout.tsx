// app/dashboard/_layout.tsx
import { Stack, useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import { useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function DashboardLayout() {
  const { isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/login');
  };

  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
            <Text style={{ color: '#2196F3' }}>Logout</Text>
          </TouchableOpacity>
        ),
      }}
    />
  );
}
