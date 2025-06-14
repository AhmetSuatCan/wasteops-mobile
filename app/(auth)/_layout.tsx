import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';

export default function AuthLayout() {
  const { isAuthenticated, user , hasOrganization, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Wait for loading to finish before doing any routing logic
    if (isLoading) return;

    if (isAuthenticated) {
      if (hasOrganization === null) {
        // We don't know if the user has an organization yet; do nothing or show a loading screen
        if(user.role === 'A'){  
          router.replace('/organizationCreate')
        }else{
          router.replace('/organizationJoin')
        }
      }
      console.log(`organization status on layout component: ${hasOrganization}`)

      if (hasOrganization !== false) {
        // User is authenticated and has an organization
        if(user.role === 'A'){
          router.replace('/panel');
        }else{
          router.replace('/home');
        }
      } else{
        // User is authenticated but doesn't have an organization
        if(user.role === 'A'){
          router.replace('/organizationCreate');
        }else{
          router.replace('/organizationJoin');
        }
      }
    } else {
      // User is not authenticated, stay on the login/registration screen
      router.replace('/login'); // or the path to your login screen
    }
  }, [isAuthenticated, hasOrganization, isLoading, router]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

