import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '../../store/authStore';

export default function ProfileScreen() {
  const { user, logout, hasOrganization } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.replace('/panel')}
        >
          <Ionicons name="chevron-back" size={30} color="#169976" />
        </TouchableOpacity>
        <Text style={styles.title}>Profil</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoSection}>
          <Text style={styles.label}>İsim</Text>
          <Text style={styles.value}>{user?.name}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>E-posta</Text>
          <Text style={styles.value}>{user?.email}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Rol</Text>
          <Text style={styles.value}>{user?.role === 'A' ? 'Yönetici' : 'Çalışan'}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Organizasyon</Text>
          <Text style={styles.value}>
            {user?.role === 'A' 
              ? `${hasOrganization?.name || 'Şirketi yok'}`
              : `${hasOrganization?.name || 'Şirket'}`
            }
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 20,
  },
  infoSection: {
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#169976',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
