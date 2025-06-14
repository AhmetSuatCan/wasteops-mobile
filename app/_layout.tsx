// app/_layout.tsx
import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuthStore } from '../store/authStore';

export default function RootLayout() {
  const {hasOrganization, checkAuth, isAuthenticated, isLoading, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Check auth status when the app starts
    checkAuth();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      if (hasOrganization === null) {
        if(user.role === 'A'){  
          router.replace('/organizationCreate')
        }else{
          router.replace('/organizationJoin')
        }
      }
      console.log(`organization status on layout component: ${hasOrganization}`)

      if (hasOrganization !== false) {
        if(user.role === 'A'){  
          router.replace('/panel');
        }else{
          router.replace('/home');
        }
      } else{
        if(user.role === 'A'){
          router.replace('/organizationCreate');
        }else{
          router.replace('/organizationJoin');
        }
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
