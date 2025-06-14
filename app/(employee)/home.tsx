import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { useEmployeeData } from '../../hooks/useEmployeeData';
import { useAuthStore } from '../../store/authStore';

export default function EmployeeHome() {
  const { user, hasOrganization, isLoading: authLoading } = useAuthStore();
  const { team, loading, error, refresh } = useEmployeeData();
  
  // Show loading state while auth is loading or data is being fetched
  if (loading || authLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#169976" />
      </View>
    );
  }

  // Show error state if there's an error
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Show message if user or organization data is not available
  if (!user || !hasOrganization) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Kullanıcı veya organizasyon bilgileri bulunamadı.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="account" size={24} color="#2196F3" />
              <Text style={styles.cardTitle}>Çalışan Bilgileri</Text>
            </View>
            
            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="account-circle" size={20} color="#666" />
                <Text style={styles.infoText}>{user.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="email" size={20} color="#666" />
                <Text style={styles.infoText}>{user.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="office-building" size={20} color="#666" />
                <Text style={styles.infoText}>{hasOrganization.name}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {team && (
          <>
            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <MaterialCommunityIcons name="account-group" size={24} color="#4CAF50" />
                  <Text style={styles.cardTitle}>Ekip Bilgileri</Text>
                </View>
                
                <View style={styles.infoSection}>
                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="tag" size={20} color="#666" />
                    <Text style={styles.infoText}>{team.name}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="information" size={20} color="#666" />
                    <Text style={styles.infoText}>Durum: {team.status}</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>

            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <MaterialCommunityIcons name="account-multiple" size={24} color="#FF9800" />
                  <Text style={styles.cardTitle}>Ekip Üyeleri</Text>
                </View>
                
                <View style={styles.membersSection}>
                  {team.members.map((member) => (
                    <View key={member.id} style={styles.memberRow}>
                      <MaterialCommunityIcons 
                        name={member.role === 'Driver' ? 'truck' : 'account-group'} 
                        size={20} 
                        color="#666" 
                      />
                      <View style={styles.memberInfo}>
                        <Text style={styles.memberName}>{member.user.name}</Text>
                        <View style={styles.memberDetails}>
                          <Text style={styles.memberRole}>
                            {member.role === 'Driver' ? 'Sürücü' : 'Toplayıcı'}
                          </Text>
                          <Text style={styles.memberJoinDate}>
                            Katılım: {new Date(member.assigned_at).toLocaleDateString('tr-TR')}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </Card.Content>
            </Card>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
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
  infoSection: {
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
  membersSection: {
    gap: 12,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  memberDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  memberRole: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  memberJoinDate: {
    fontSize: 12,
    color: '#999',
  },
});
