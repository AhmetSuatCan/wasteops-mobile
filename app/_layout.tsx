// app/_layout.tsx
import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuthStore } from '../store/authStore';

export default function RootLayout() {
  const {hasOrganization, checkAuth, isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Check auth status when the app starts
    checkAuth();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      if (hasOrganization === null) {
        router.replace('/organizationCreate')
      }
      console.log(`organization status on layout component: ${hasOrganization}`)

      if (hasOrganization !== false) {
        router.replace('/panel');
      } else{
        router.replace('/organizationCreate');
      }
    } else {
      router.replace('/login'); 
    }
  }, [isAuthenticated, hasOrganization, isLoading, router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}
