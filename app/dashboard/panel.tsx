// app/dashboard/index.tsx
import { View, Text, StyleSheet } from 'react-native';
import { useAuthStore } from '../../store/authStore';

export default function Dashboard() {
  const { user } = useAuthStore();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Dashboard</Text>
      {user && <Text style={styles.subtitle}>Hello, {user.name}!</Text>}
      
      <Text style={styles.content}>
        This is your authenticated dashboard. You can now access protected content.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  content: {
    textAlign: 'center',
  },
});
