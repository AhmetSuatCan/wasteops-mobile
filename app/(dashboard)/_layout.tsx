// app/dashboard/_layout.tsx
import { Tabs, useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import { useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import icons

type TabBarIconProps = { color: string; size: number }; // 👈 fix typing for icons

export default function DashboardLayout() {
  const { isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
            <Text style={{ color: '#2196F3' }}>Logout</Text>
          </TouchableOpacity>
        ),
        tabBarActiveTintColor: '#2196F3',
      }}
    >
      <Tabs.Screen 
        name="panel"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="facilities" 
        options={{
          title: 'Facilities',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Ionicons name="business-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="operations"
        options={{
          title: 'Operations',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Ionicons name="construct-outline" size={size} color={color} />
          ),
        }}
      />
     <Tabs.Screen 
        name="hr"
        options={{
          title: 'HR',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
       <Tabs.Screen 
        name="inventory"
        options={{
          title: 'Inventory',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Ionicons name="cube-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

