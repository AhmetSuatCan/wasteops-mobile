import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEmployment } from '../hooks/useEmployment';

interface User {
  id: string;
  name: string;
  gender: 'M' | 'F' | 'O';
  email: string;
  age: number;
  phone_number: string;
  address: string;
}

interface EmployeeCardProps {
  id: number;
  user: User;
  start_date: string;
  created_at: string;
}

export function EmployeeCard({ id, user, start_date }: EmployeeCardProps) {
  const { terminateEmployment, loading } = useEmployment();

  const handleEndEmployment = () => {
    Alert.alert(
      'İş Akdini Sonlandır',
      `${user.name} isimli çalışanın iş akdini sonlandırmak istediğinize emin misiniz?`,
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Sonlandır',
          style: 'destructive',
          onPress: async () => {
            try {
              await terminateEmployment(user.id);
            } catch (error) {
              Alert.alert('Hata', 'İş akdi sonlandırılırken bir hata oluştu.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.employeeInfo}>
        <Text style={styles.employeeName}>{user.name}</Text>
        <Text style={styles.employeeEmail}>{user.email}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Telefon:</Text>
            <Text style={styles.detailValue}>{user.phone_number}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Adres:</Text>
            <Text style={styles.detailValue}>{user.address}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Başlangıç:</Text>
            <Text style={styles.detailValue}>
              {new Date(start_date).toLocaleDateString('tr-TR')}
            </Text>
          </View>
        </View>
        <TouchableOpacity 
          style={[styles.endButton, loading && styles.endButtonDisabled]} 
          onPress={handleEndEmployment}
          disabled={loading}
        >
          <Text style={styles.endButtonText}>
            {loading ? 'İşlem Yapılıyor...' : 'İş Akdini Sonlandır'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  employeeInfo: {
    gap: 8,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  employeeEmail: {
    fontSize: 14,
    color: '#666',
  },
  detailsContainer: {
    marginTop: 8,
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    minWidth: 80,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  endButton: {
    backgroundColor: '#ff4444',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  endButtonDisabled: {
    opacity: 0.6,
  },
  endButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 