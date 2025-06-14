// app/dashboard/index.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { useAuthStore } from '../../store/authStore';

export default function Dashboard() {
  const { hasOrganization } = useAuthStore();
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="office-building" size={24} color="#2196F3" />
              <Text style={styles.cardTitle}>Organizasyon Bilgileri</Text>
            </View>
            
            {hasOrganization ? (
              <View style={styles.orgInfo}>
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons name="domain" size={20} color="#666" />
                  <Text style={styles.infoText}>{hasOrganization.name}</Text>
                </View>
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons name="map-marker" size={20} color="#666" />
                  <Text style={styles.infoText}>{hasOrganization.address}</Text>
                </View>
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons name="phone" size={20} color="#666" />
                  <Text style={styles.infoText}>{hasOrganization.phone}</Text>
                </View>
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons name="email" size={20} color="#666" />
                  <Text style={styles.infoText}>{hasOrganization.email}</Text>
                </View>
              </View>
            ) : (
              <Text style={styles.noOrgText}>Henüz bir organizasyona bağlı değilsiniz.</Text>
            )}
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#333',
  },
  orgInfo: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#444',
  },
  noOrgText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
});
