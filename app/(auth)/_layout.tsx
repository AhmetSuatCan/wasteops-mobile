import { Stack } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function AuthLayout() {
  const { isAuthenticated, hasOrganization, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Wait for loading to finish before doing any routing logic
    if (isLoading) return;

    if (isAuthenticated) {
        console.log('BUBIRHATA')
        console.log(hasOrganization)
      if (hasOrganization === null) {
        // We don't know if the user has an organization yet; do nothing or show a loading screen
        return;
      }

      if (hasOrganization.hasOrganization !== false) {
        // User is authenticated and has an organization
        router.replace('/panel');
      } else{
        // User is authenticated but doesn't have an organization
        router.replace('/organizationCreate');
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

