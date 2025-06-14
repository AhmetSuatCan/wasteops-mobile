import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../store/authStore';

type TabBarIconProps = { color: string; size: number };

export default function EmployeeLayout() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated]);

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity 
            onPress={() => router.replace('/(profile)')} 
            style={{ marginRight: 15 }}
          >
            <Ionicons name="person-circle-outline" size={28} color="#169976" />
          </TouchableOpacity>
        ),
        tabBarActiveTintColor: '#169976',
      }}
    >
      <Tabs.Screen 
        name="home"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="shifts" 
        options={{
          title: 'Vardiyalar',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
