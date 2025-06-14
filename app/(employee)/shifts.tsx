import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { useEmployeeData } from '../../hooks/useEmployeeData';
import { useAuthStore } from '../../store/authStore';

export default function EmployeeShifts() {
  const { user, hasOrganization, isLoading: authLoading } = useAuthStore();
  const { shifts, loading, error, refresh } = useEmployeeData();

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

  const now = new Date();
  const upcomingShifts = shifts.filter(shift => new Date(shift.start_time) > now);
  const pastShifts = shifts.filter(shift => new Date(shift.start_time) <= now);

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return 'Bitmedi';
    const date = new Date(dateString);
    return date.toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="clock-check-outline" size={24} color="#4CAF50" />
              <Text style={styles.cardTitle}>Yaklaşan Vardiyalar</Text>
            </View>
            
            <View style={styles.shiftsSection}>
              {upcomingShifts.length > 0 ? (
                upcomingShifts.map((shift) => (
                  <View key={shift.id} style={styles.shiftItem}>
                    <View style={styles.shiftHeader}>
                      <MaterialCommunityIcons name="clock-outline" size={20} color="#4CAF50" />
                      <Text style={styles.shiftName}>{shift.name}</Text>
                    </View>
                    <View style={styles.shiftDetails}>
                      <Text style={styles.shiftTime}>
                        Başlangıç: {formatDateTime(shift.start_time)}
                      </Text>
                      <Text style={[
                        styles.shiftTime,
                        !shift.end_time && styles.unfinishedShift
                      ]}>
                        Bitiş: {formatDateTime(shift.end_time)}
                      </Text>
                      <Text style={[styles.shiftStatus, { color: '#4CAF50' }]}>
                        Durum: {shift.status}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.noShiftsText}>Henüz planlanmış vardiya bulunmuyor.</Text>
              )}
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="history" size={24} color="#2196F3" />
              <Text style={styles.cardTitle}>Vardiya Geçmişi</Text>
            </View>
            
            <View style={styles.shiftsSection}>
              {pastShifts.length > 0 ? (
                pastShifts.map((shift) => (
                  <View key={shift.id} style={styles.shiftItem}>
                    <View style={styles.shiftHeader}>
                      <MaterialCommunityIcons name="clock-outline" size={20} color="#2196F3" />
                      <Text style={styles.shiftName}>{shift.name}</Text>
                    </View>
                    <View style={styles.shiftDetails}>
                      <Text style={styles.shiftTime}>
                        Başlangıç: {formatDateTime(shift.start_time)}
                      </Text>
                      <Text style={[
                        styles.shiftTime,
                        !shift.end_time && styles.unfinishedShift
                      ]}>
                        Bitiş: {formatDateTime(shift.end_time)}
                      </Text>
                      <Text style={[styles.shiftStatus, { color: '#2196F3' }]}>
                        Durum: {shift.status}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.noShiftsText}>Henüz tamamlanmış vardiya bulunmuyor.</Text>
              )}
            </View>
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
  shiftsSection: {
    gap: 12,
  },
  shiftItem: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  shiftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  shiftName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  shiftDetails: {
    gap: 4,
  },
  shiftTime: {
    fontSize: 14,
    color: '#666',
  },
  shiftStatus: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  noShiftsText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  unfinishedShift: {
    color: '#FF9800',
    fontStyle: 'italic',
  },
});
