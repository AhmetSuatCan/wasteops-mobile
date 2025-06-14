// app/dashboard/_layout.tsx
import { Ionicons } from '@expo/vector-icons'; // Import icons
import { Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../store/authStore';

type TabBarIconProps = { color: string; size: number }; // 👈 fix typing for icons

export default function DashboardLayout() {
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
        name="panel"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="facilities" 
        options={{
          title: 'Tesisler',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Ionicons name="business-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="operations"
        options={{
          title: 'Operasyonlar',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Ionicons name="construct-outline" size={size} color={color} />
          ),
        }}
      />
     <Tabs.Screen 
        name="human_resources"
        options={{
          title: 'İnsan Kaynakları',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
       <Tabs.Screen 
        name="fleet"
        options={{
          title: 'Filo',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Ionicons name="car-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

