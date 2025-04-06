// app/_layout.tsx
import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useAuthStore } from '../store/authStore';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  const { checkAuth, isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      const isValid = await checkAuth();
      
      if (isValid) {
          router.replace('/dashboard/panel');
      } else {
        router.replace('/auth/login');
      }
    };

    verifyAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack />;
}
