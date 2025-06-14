import { StyleSheet, Text, View } from 'react-native';
import { useAuthStore } from '../../store/authStore';

export default function ShiftsScreen() {
  const { user } = useAuthStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vardiyalarım</Text>
      <Text style={styles.subtitle}>Hoş geldiniz, {user?.name}</Text>
      <View style={styles.content}>
        <Text style={styles.message}>
          Vardiya bilgileriniz burada görüntülenecektir.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
}); 